package handlers

import(
	"crypto/rand"
	"encoding/hex"
	"encoding/json"
	"log"
	"net/http"
	"os"
	"time"

	"upcycleconnect/api/bdd"
	"upcycleconnect/api/mailer"
	"upcycleconnect/api/models"

	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
)

func generateToken() string {
	b := make([]byte, 16)
	rand.Read(b)
	return hex.EncodeToString(b)
}


func Register(w http.ResponseWriter ,r *http.Request){
	var input struct {
		FirstName string `json:"first_name"`
		LastName  string `json:"last_name"`
		Mail      string `json:"mail"`
		Password  string `json:"password"`
		Phone     string `json:"phone"`
		Address   string `json:"address"`
		Role      string `json:"role"`
		Language  string `json:"language"`
	}
	err := json.NewDecoder(r.Body).Decode(&input)
	if err != nil{
		http.Error(w,"Error payload" , http.StatusBadRequest)
		return
	}
	newUser := models.User{
		FirstName: input.FirstName,
		LastName:  input.LastName,
		Mail:      input.Mail,
		Password:  input.Password,
		Phone:     input.Phone,
		Address:   input.Address,
		Role:      input.Role,
		Language:  input.Language,
	}
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(newUser.Password), bcrypt.DefaultCost)
	if err != nil {
		http.Error(w, "Error hashing password", http.StatusInternalServerError)
		return
	}
	newUser.Password = string(hashedPassword)
	err = bdd.CreateUser(newUser)
	if err != nil{
		http.Error(w,"Error insertion in bdd",http.StatusInternalServerError)
		return
	}

	token := generateToken()
	if err := bdd.SetVerificationToken(newUser.Mail, token); err != nil {
		http.Error(w, "Erreur enregistrement token", http.StatusInternalServerError)
		return
	}
	if err := mailer.SendVerificationEmail(newUser.Mail, token); err != nil {
		log.Println("Erreur envoi email de verification:", err)
	}

	w.WriteHeader(http.StatusCreated)
}

func Login(w http.ResponseWriter, r *http.Request){
	var credentials struct {
		Mail		string `json:"mail"`
		Password	string `json:"password"`
	}
	err := json.NewDecoder(r.Body).Decode(&credentials)
	if err != nil{
		http.Error(w,"Error decoding",http.StatusBadRequest)
		return
	}
	user , err := bdd.GetUserByMail(credentials.Mail)
	if err != nil {
		http.Error(w,"Error mail not exist in base",http.StatusNotFound)
		return
	}
	err = bcrypt.CompareHashAndPassword([]byte(user.Password),
	[]byte(credentials.Password))
	if err != nil {
		http.Error(w,"Bad Password",http.StatusUnauthorized)
		return
	}
	if !user.Verified {
		http.Error(w, "Email non verifie. Verifie ta boite mail.", http.StatusForbidden)
		return
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
    "id":   user.ID,
    "role": user.Role,
    "exp":  time.Now().Add(48 * time.Hour).Unix(),
})
	tokenString, err := token.SignedString([]byte(os.Getenv("JWT_SECRET")))
	if err != nil{
		http.Error(w,"Error with token",http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{"token": tokenString})
}

func VerifyEmail(w http.ResponseWriter, r *http.Request) {
	token := r.URL.Query().Get("token")
	if token == "" {
		http.Error(w, "Token manquant", http.StatusBadRequest)
		return
	}
	if err := bdd.VerifyUserByToken(token); err != nil {
		http.Error(w, "Lien invalide ou deja utilise", http.StatusBadRequest)
		return
	}
	frontURL := os.Getenv("FRONTEND_URL")
	if frontURL == "" {
		frontURL = "http://localhost:5173"
	}
	http.Redirect(w, r, frontURL+"/login?verified=1", http.StatusSeeOther)
}
