package models

type Evenement struct {
	ID          int    `json:"id_evenement"`
	Nom         string `json:"nom"`
	Description string `json:"description"`
	DateDebut   string `json:"date_debut"`
	DateFin     string `json:"date_fin"`
	Lieu        string `json:"lieu"`
	CapaciteMax int    `json:"capacite_max"`
	Statut      string `json:"statut"`
	IDUser      int    `json:"id_users"`
}
