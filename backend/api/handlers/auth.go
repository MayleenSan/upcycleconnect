package handlers

import(
	"encoding/json"
	"upcycleconnect/api/bdd"
	"upcycleconnect/api/models"
	"golang.org/x/crypto/bcrypt"
	"net/http"
	"time"
	"github.com/golang-jwt/jwt/v5"
	"os"
)


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
