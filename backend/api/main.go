package main

import (
	"fmt"
	"log"
	"net/http"
	"strings"
	"upcycleconnect/api/config"
	"upcycleconnect/api/handlers"
)

func withCORS(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusOK)
			return
		}
		next(w, r)
	}
}

func main() {
	config.ConnectDB()

	http.HandleFunc("/api/users/", withCORS(func(w http.ResponseWriter, r *http.Request) {
		switch r.Method {
		case http.MethodGet:
			if strings.Contains(r.URL.Path, "/email/") {
				handlers.GetUserByMail(w, r)
			} else {
				handlers.GetUsers(w, r)
			}
		case http.MethodPost:
			handlers.CreateUser(w, r)
		case http.MethodDelete:
			handlers.DeleteUser(w, r)
		case http.MethodPut:
			handlers.UpdateUser(w, r)
		default:
			http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		}
	}))

	http.HandleFunc("/api/login", withCORS(handlers.Login))

	http.HandleFunc("/api/annonces/", withCORS(func(w http.ResponseWriter, r *http.Request) {
		switch r.Method {
		case http.MethodGet:
			handlers.GetAnnonces(w, r)
		case http.MethodPost:
			handlers.CreateAnnonceHandler(w, r)
		case http.MethodDelete:
			handlers.DeleteAnnonceHandler(w, r)
		default:
			http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		}
	}))

	fmt.Println("Server is running on port 8085")

	err := http.ListenAndServe(":8085", nil)
	if err != nil {
		log.Fatal("Critical server error: ", err)
	}
}
