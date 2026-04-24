package handlers

import (
	"encoding/json"
	"net/http"
	"strconv"
	"strings"
	"upcycleconnect/api/bdd"
	"upcycleconnect/api/models"
)

func GetEvenements(w http.ResponseWriter, r *http.Request) {
	evenements, err := bdd.GetAllEvenements()
	if err != nil {
		http.Error(w, "Error fetching evenements", http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(evenements)
}

func GetEvenementById(w http.ResponseWriter, r *http.Request) {
	idStr := strings.TrimPrefix(r.URL.Path, "/api/evenements/")
	id, err := strconv.Atoi(idStr)
	if err != nil {
		http.Error(w, "Invalid evenement ID", http.StatusBadRequest)
		return
	}
	e, err := bdd.GetEvenementById(id)
	if err != nil {
		http.Error(w, "Evenement not found", http.StatusNotFound)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(e)
}

func CreateEvenement(w http.ResponseWriter, r *http.Request) {
	var newEvenement models.Evenement
	err := json.NewDecoder(r.Body).Decode(&newEvenement)
	if err != nil {
		http.Error(w, "Invalid JSON payload", http.StatusBadRequest)
		return
	}
	err = bdd.CreateEvenement(newEvenement)
	if err != nil {
		http.Error(w, "Failed to create evenement", http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
}

func DeleteEvenement(w http.ResponseWriter, r *http.Request) {
	idStr := strings.TrimPrefix(r.URL.Path, "/api/evenements/")
	id, err := strconv.Atoi(idStr)
	if err != nil {
		http.Error(w, "Invalid evenement ID", http.StatusBadRequest)
		return
	}
	err = bdd.DeleteEvenement(id)
	if err != nil {
		http.Error(w, "Failed to delete evenement", http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{"message": "Evenement successfully deleted!"})
}

func UpdateEvenement(w http.ResponseWriter, r *http.Request) {
	idStr := strings.TrimPrefix(r.URL.Path, "/api/evenements/")
	id, err := strconv.Atoi(idStr)
	if err != nil {
		http.Error(w, "Invalid evenement ID", http.StatusBadRequest)
		return
	}
	var updateEvenement models.Evenement
	err = json.NewDecoder(r.Body).Decode(&updateEvenement)
	if err != nil {
		http.Error(w, "Invalid JSON payload", http.StatusBadRequest)
		return
	}
	err = bdd.UpdateEvenement(id, updateEvenement)
	if err != nil {
		http.Error(w, "Failed to update evenement", http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{"message": "Evenement successfully updated!"})
}
