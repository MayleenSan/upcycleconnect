package main

import (
	"fmt"
	"log"
	"net/http"
	"strings"
	"upcycleconnect/api/config"
	"upcycleconnect/api/handlers"
)

func main() {
	config.ConnectDB()

	http.HandleFunc("/api/users/", func(w http.ResponseWriter, r *http.Request) {
		switch r.Method {
		case http.MethodGet:
			if strings.Contains(r.URL.Path, "/email/"){
				handlers.GetUserByMail(w,r)
			}else{
				handlers.GetUsers(w,r)
			}
		case http.MethodPost:
			handlers.CreateUser(w, r)
		case http.MethodDelete:
			handlers.DeleteUser(w,r)
		case http.MethodPut:
			handlers.UpdateUser(w,r)
		default:
			http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		}
	})
	http.HandleFunc("/api/prestation/", func(w http.ResponseWriter, r *http.Request) {
		switch r.Method {
		case http.MethodGet:
			if strings.TrimPrefix(r.URL.Path, "/api/prestation/") != "" {
				handlers.GetPrestationById(w,r)
			}else{
				handlers.GetAllPrestations(w,r)
			}
		case http.MethodPost:
			handlers.CreatePrestation(w, r)
		case http.MethodDelete:
			handlers.DeletePrestation(w,r)
		case http.MethodPut:
			handlers.UpdatePrestation(w,r)
		default:
			http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		}
	})
	http.HandleFunc("/api/categories/", func(w http.ResponseWriter, r *http.Request) {
		switch r.Method {
		case http.MethodGet:
			if strings.TrimPrefix(r.URL.Path, "/api/categories/") != "" {
				handlers.GetCategorieById(w, r)
			} else {
				handlers.GetCategories(w, r)
			}
		case http.MethodPost:
			handlers.CreateCategorie(w, r)
		case http.MethodDelete:
			handlers.DeleteCategorie(w, r)
		case http.MethodPut:
			handlers.UpdateCategorie(w, r)
		default:
			http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		}
	})

	http.HandleFunc("/api/evenements/", func(w http.ResponseWriter, r *http.Request) {
		switch r.Method {
		case http.MethodGet:
			if strings.TrimPrefix(r.URL.Path, "/api/evenements/") != "" {
				handlers.GetEvenementById(w, r)
			} else {
				handlers.GetEvenements(w, r)
			}
		case http.MethodPost:
			handlers.CreateEvenement(w, r)
		case http.MethodDelete:
			handlers.DeleteEvenement(w, r)
		case http.MethodPut:
			handlers.UpdateEvenement(w, r)
		default:
			http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		}
	})

	fmt.Println("Server is running on port 8085")
	
	err := http.ListenAndServe(":8085", nil)
	if err != nil {
		log.Fatal("Critical server error: ", err)
	}
}