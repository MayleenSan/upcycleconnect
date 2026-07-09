package models

type Annonce struct {
	ID           int    `json:"id_annonce"`
	UserID       int    `json:"id_users"`
	Titre        string `json:"titre"`
	Categorie    string `json:"categorie"`
	Type         string `json:"type"`
	Localisation string `json:"localisation"`
	Description  string `json:"description"`
	CreatedAt    string `json:"created_at"`
}
