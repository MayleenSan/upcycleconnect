package bdd

import (
	"upcycleconnect/api/config"
	"upcycleconnect/api/models"
)

func GetAllAnnonces() ([]models.Annonce, error) {
	var annonces []models.Annonce
	query := `SELECT id_annonce, id_users, titre, categorie, type, localisation, description, created_at FROM "annonces" ORDER BY created_at DESC`
	rows, err := config.DB.Query(query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	for rows.Next() {
		var a models.Annonce
		err := rows.Scan(&a.ID, &a.UserID, &a.Titre, &a.Categorie, &a.Type, &a.Localisation, &a.Description, &a.CreatedAt)
		if err != nil {
			continue
		}
		annonces = append(annonces, a)
	}
	return annonces, nil
}

func CreateAnnonce(a models.Annonce) error {
	query := `INSERT INTO "annonces" (id_users, titre, categorie, type, localisation, description) VALUES ($1, $2, $3, $4, $5, $6)`
	_, err := config.DB.Exec(query, a.UserID, a.Titre, a.Categorie, a.Type, a.Localisation, a.Description)
	return err
}

func DeleteAnnonce(id int) error {
	query := `DELETE FROM "annonces" WHERE id_annonce = $1`
	_, err := config.DB.Exec(query, id)
	return err
}
