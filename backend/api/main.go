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
			handlers.GetUsers(w, r)
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

	fmt.Println("Server is running on port 8085")
	
	err := http.ListenAndServe(":8085", nil)
	if err != nil {
		log.Fatal("Critical server error: ", err)
	}
}