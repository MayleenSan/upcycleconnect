package handlers

import (
	"encoding/json"
	"net/http"
	"strconv"
	"strings"
	"upcycleconnect/api/bdd"
	"upcycleconnect/api/models"
)

func GetCategories(w http.ResponseWriter, r *http.Request) {
	categories, err := bdd.GetAllCategories()
	if err != nil {
		http.Error(w, "Error fetching categories", http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(categories)
}

func GetCategorieById(w http.ResponseWriter, r *http.Request) {
	idStr := strings.TrimPrefix(r.URL.Path, "/api/categories/")
	id, err := strconv.Atoi(idStr)
	if err != nil {
		http.Error(w, "Invalid categorie ID", http.StatusBadRequest)
		return
	}
	c, err := bdd.GetCategorieById(id)
	if err != nil {
		http.Error(w, "Categorie not found", http.StatusNotFound)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(c)
}

func CreateCategorie(w http.ResponseWriter, r *http.Request) {
	var newCategorie models.Categorie
	err := json.NewDecoder(r.Body).Decode(&newCategorie)
	if err != nil {
		http.Error(w, "Invalid JSON payload", http.StatusBadRequest)
		return
	}
	err = bdd.CreateCategorie(newCategorie)
	if err != nil {
		http.Error(w, "Failed to create categorie", http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
}

func DeleteCategorie(w http.ResponseWriter, r *http.Request) {
	idStr := strings.TrimPrefix(r.URL.Path, "/api/categories/")
	id, err := strconv.Atoi(idStr)
	if err != nil {
		http.Error(w, "Invalid categorie ID", http.StatusBadRequest)
		return
	}
	err = bdd.DeleteCategorie(id)
	if err != nil {
		http.Error(w, "Failed to delete categorie", http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{"message": "Categorie successfully deleted!"})
}

func UpdateCategorie(w http.ResponseWriter, r *http.Request) {
	idStr := strings.TrimPrefix(r.URL.Path, "/api/categories/")
	id, err := strconv.Atoi(idStr)
	if err != nil {
		http.Error(w, "Invalid categorie ID", http.StatusBadRequest)
		return
	}
	var updateCategorie models.Categorie
	err = json.NewDecoder(r.Body).Decode(&updateCategorie)
	if err != nil {
		http.Error(w, "Invalid JSON payload", http.StatusBadRequest)
		return
	}
	err = bdd.UpdateCategorie(id, updateCategorie)
	if err != nil {
		http.Error(w, "Failed to update categorie", http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{"message": "Categorie successfully updated!"})
}
