package models

type Annonce struct {
    ID           int     `json:"id_annonce"`
    Titre        string  `json:"titre"`
    Description  string  `json:"description"`
    Prix         float64 `json:"prix"`
    Etat         string  `json:"etat"`         
    Statut       string  `json:"statut"`       
    DateCreation string  `json:"date_creation"`
    IDCategorie  int     `json:"id_categories"`
    IDUser       int     `json:"id_users"`
}