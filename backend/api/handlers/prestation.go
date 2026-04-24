package handlers

import (
	"encoding/json"
	"strconv"
	"strings"

	"net/http"

	"upcycleconnect/api/bdd"
	"upcycleconnect/api/models"

	
)
func GetPrestationById(w http.ResponseWriter , r *http.Request){
	id := strings.TrimPrefix(r.URL.Path, "/api/prestation/")
	if id == "" {
		http.Error(w, "id missing in URL", http.StatusBadRequest)
		return
	}
	idInt, err := strconv.Atoi(id)
	p,err := bdd.GetPrestationById(idInt)
	if err != nil{
		http.Error(w,"Prestation not found", http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type","application/json")
	err = json.NewEncoder(w).Encode(p)
}
func GetAllPrestations(w http.ResponseWriter, r *http.Request){
	prestations, err := bdd.GetAllPrestations()
	if err != nil{
		http.Error(w,"Error fetching prestation", http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type","application/json")
	err = json.NewEncoder(w).Encode(prestations)
}
func CreatePrestation(w http.ResponseWriter , r *http.Request){
	var newPrestation models.Prestation
	err := json.NewDecoder(r.Body).Decode(&newPrestation)
	if err != nil{
		http.Error(w,"Invalid JSON payload",http.StatusBadRequest)
		return
	}
	err = bdd.CreatePrestation(newPrestation)
	if err != nil{
		http.Error(w,"Failed to create prestation", http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type","application/json")
	w.WriteHeader(http.StatusCreated)
}
func UpdatePrestation(w http.ResponseWriter, r *http.Request){

	idStr := strings.TrimPrefix(r.URL.Path, "/api/prestation/")
	id,err := strconv.Atoi(idStr)
	if err != nil{
		http.Error(w, "Invalid prestation ID", http.StatusBadRequest)
		return
	}
	var updateprestation models.Prestation
	err = json.NewDecoder(r.Body).Decode(&updateprestation)
	if err != nil {
		http.Error(w,"Failed to update prestation",http.StatusBadRequest)
		return 
	}
	err = bdd.UpdatePrestation(id, updateprestation)
	if err != nil {
		http.Error(w, "Failed to update prestation", http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{"message": "Prestation successfully updated!"})

}

func DeletePrestation(w http.ResponseWriter, r *http.Request){
	idStr := strings.TrimPrefix(r.URL.Path, "/api/prestation/")
	id,err := strconv.Atoi(idStr)
	if err != nil{
		http.Error(w, "Invalid prestation ID", http.StatusBadRequest)
		return
	}
	err = bdd.DeletePrestation(id)
	if err!= nil {
		http.Error(w,"Invalid prestation ID",http.StatusBadRequest)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{"message": "Prestation successfully deleted!"})
}