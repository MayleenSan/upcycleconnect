package models
type Prestation struct {
	ID int `json:"id_prestation"`
	Nom string `json:"nom"`
	Description string  `json:"description"`
	Tarif       float64 `json:"tarif"`
	CapaciteMax int     `json:"capacite_max"`
	Duree       int     `json:"duree"`
	DateCreation string `json:"date_creation"`
	Statut      string  `json:"statut"`
	IDCategorie int     `json:"id_categories"`
	IDUser      int     `json:"id_users"`

}