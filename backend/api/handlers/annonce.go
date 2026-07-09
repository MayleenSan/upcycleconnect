package handlers

import (
	"encoding/json"
	"net/http"
	"strconv"
	"strings"

	"upcycleconnect/api/bdd"
	"upcycleconnect/api/models"
)

func GetAnnonces(w http.ResponseWriter, r *http.Request) {
	annonces, err := bdd.GetAllAnnonces()
	if err != nil {
		http.Error(w, "Error fetching annonces", http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(annonces)
}

func CreateAnnonceHandler(w http.ResponseWriter, r *http.Request) {
	var newAnnonce models.Annonce
	err := json.NewDecoder(r.Body).Decode(&newAnnonce)
	if err != nil {
		http.Error(w, "Invalid JSON payload", http.StatusBadRequest)
		return
	}
	err = bdd.CreateAnnonce(newAnnonce)
	if err != nil {
		http.Error(w, "Failed to create annonce", http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
}

func DeleteAnnonceHandler(w http.ResponseWriter, r *http.Request) {
	idStr := strings.TrimPrefix(r.URL.Path, "/api/annonces/")
	id, err := strconv.Atoi(idStr)
	if err != nil {
		http.Error(w, "Invalid annonce ID", http.StatusBadRequest)
		return
	}
	err = bdd.DeleteAnnonce(id)
	if err != nil {
		http.Error(w, "Failed to delete annonce", http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{"message": "Annonce supprimée"})
}
