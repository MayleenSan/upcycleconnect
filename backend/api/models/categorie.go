package models

type Categorie struct {
	ID          int    `json:"id_categories"`
	Nom         string `json:"nom"`
	Description string `json:"description"`
}
