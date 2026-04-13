package handlers

import (
	"encoding/json"
	"strconv"
	"strings"

	"net/http"

	"upcycleconnect/api/bdd"
	"upcycleconnect/api/models"

	"golang.org/x/crypto/bcrypt"
)
func GetUserByMail(w http.ResponseWriter, r *http.Request){
	email := strings.TrimPrefix(r.URL.Path, "/api/users/email/")
	if email == "" {
		http.Error(w, "Email missing in URL", http.StatusBadRequest)
		return
	}
	user, err := bdd.GetUserByMail(email)
	if err != nil {
		http.Error(w, "User not found", http.StatusNotFound)
		return
	}
	w.Header().Set("Content-Type","application/json")
	err = json.NewEncoder(w).Encode(user)
}
func GetUsers(w http.ResponseWriter, r *http.Request) {
	users, err := bdd.GetAllUsers()
	if err != nil{
		http.Error(w,"Error fetching users", http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type","application/json")
	err = json.NewEncoder(w).Encode(users)
}
func CreateUser(w http.ResponseWriter, r *http.Request){
	var newUser models.User
	err := json.NewDecoder(r.Body).Decode(&newUser)
	if err != nil{
		http.Error(w,"Invalid JSON payload",http.StatusBadRequest)
		return
	}
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(newUser.Password), bcrypt.DefaultCost)
	if err != nil {
		http.Error(w, "Error hashing password", http.StatusInternalServerError)
		return
	}
	newUser.Password = string(hashedPassword)
	err = bdd.CreateUser(newUser)
	if err != nil {
		http.Error(w, "Failed to create user in database", http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type","application/json")
	w.WriteHeader(http.StatusCreated)
}
func UpdateUser(w http.ResponseWriter, r *http.Request){
	idStr := strings.TrimPrefix(r.URL.Path, "/api/users/")
	id, err := strconv.Atoi(idStr)
	if err != nil {
		http.Error(w, "Invalid user ID", http.StatusBadRequest)
		return
	}
	var updateuser models.User
	err = json.NewDecoder(r.Body).Decode(&updateuser)
	if err != nil {
		http.Error(w,"Invalid JSON payload",http.StatusBadRequest)
		return


	}
	err = bdd.UpdateUser(id, updateuser)
	if err != nil {
		http.Error(w, "Failed to update user", http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{"message": "✅ User successfully updated!"})

}
func DeleteUser(w http.ResponseWriter, r *http.Request){
	idStr := strings.TrimPrefix(r.URL.Path, "/api/users/")
	id, err := strconv.Atoi(idStr) 
	if err != nil {
		http.Error(w,"Invalid user ID in URL", http.StatusBadRequest)
		return
	}
	err = bdd.DeleteUser(id)
	if err != nil{
		http.Error(w, "failed to delete user", http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{"message": "✅ User successfully deleted!"})
}