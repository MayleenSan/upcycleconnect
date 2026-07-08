package handlers

import (
	"encoding/json"
	"net/http"
	"strconv"
	"strings"

	"upcycleconnect/api/bdd"
	"upcycleconnect/api/models"
)

func GetAnnonceById(w http.ResponseWriter, r *http.Request) {
	id := strings.TrimPrefix(r.URL.Path, "/api/annonces/")
	if id == "" {
		http.Error(w, "id missing in URL", http.StatusBadRequest)
		return
	}
	idInt, err := strconv.Atoi(id)
	if err != nil {
		http.Error(w, "Invalid annonce ID", http.StatusBadRequest)
		return
	}
	a, err := bdd.GetAnnonceById(idInt)
	if err != nil {
		http.Error(w, "Annonce not found", http.StatusNotFound)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(a)
}

func GetAllAnnonces(w http.ResponseWriter, r *http.Request) {
	annonces, err := bdd.GetAllAnnonces()
	if err != nil {
		http.Error(w, "Error fetching annonces", http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(annonces)
}

func CreateAnnonce(w http.ResponseWriter, r *http.Request) {
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

func UpdateAnnonce(w http.ResponseWriter, r *http.Request) {
	idStr := strings.TrimPrefix(r.URL.Path, "/api/annonces/")
	id, err := strconv.Atoi(idStr)
	if err != nil {
		http.Error(w, "Invalid annonce ID", http.StatusBadRequest)
		return
	}
	var updateAnnonce models.Annonce
	err = json.NewDecoder(r.Body).Decode(&updateAnnonce)
	if err != nil {
		http.Error(w, "Invalid JSON payload", http.StatusBadRequest)
		return
	}
	err = bdd.UpdateAnnonce(id, updateAnnonce)
	if err != nil {
		http.Error(w, "Failed to update annonce", http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{"message": "Annonce successfully updated!"})
}

func DeleteAnnonce(w http.ResponseWriter, r *http.Request) {
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
	json.NewEncoder(w).Encode(map[string]string{"message": "Annonce successfully deleted!"})
}

func GetMesAnnonces(w http.ResponseWriter, r *http.Request) {
	userID, _ := r.Context().Value("id").(int)
	annonces, err := bdd.GetAnnoncesByUser(userID)
	if err != nil {
		http.Error(w, "Error fetching annonces", http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(annonces)
}

func CreateMonAnnonce(w http.ResponseWriter, r *http.Request) {
	userID, _ := r.Context().Value("id").(int)
	var newAnnonce models.Annonce
	if err := json.NewDecoder(r.Body).Decode(&newAnnonce); err != nil {
		http.Error(w, "Invalid JSON payload", http.StatusBadRequest)
		return
	}
	newAnnonce.IDUser = userID
	newAnnonce.Statut = "en_attente"
	if err := bdd.CreateAnnonce(newAnnonce); err != nil {
		http.Error(w, "Failed to create annonce", http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
}
