package config

import (
	"database/sql"
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
)


var DB *sql.DB

func ConnectDB() {
	_ = godotenv.Load()

	connStr := os.Getenv("DB_URL")

	var err error
	DB, err = sql.Open("postgres", connStr)
	if err != nil {
		log.Fatal("Erreur d'ouverture : ", err)
	}

	err = DB.Ping()
	if err != nil {
		log.Fatal("Impossible de se connecter à la BDD : ", err)
	}

	fmt.Println(" BDD connectée avec succès ")
}