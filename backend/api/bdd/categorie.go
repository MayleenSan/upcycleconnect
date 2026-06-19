package bdd

import (
	"log"
	"upcycleconnect/api/config"
	"upcycleconnect/api/models"
)

func GetAllCategories() ([]models.Categorie, error) {
	categories := make([]models.Categorie, 0)
	query := `SELECT id_categories, nom, description FROM categories`
	rows, err := config.DB.Query(query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	for rows.Next() {
		var c models.Categorie
		err := rows.Scan(
			&c.ID,
			&c.Nom,
			&c.Description,
		)
		if err != nil {
			log.Println("Error scanning row:", err)
			continue
		}
		categories = append(categories, c)
	}
	if err = rows.Err(); err != nil {
		return nil, err
	}
	return categories, nil
}

func GetCategorieById(id int) (models.Categorie, error) {
	var c models.Categorie
	query := `SELECT id_categories, nom, description FROM categories WHERE id_categories=$1`
	err := config.DB.QueryRow(query, id).Scan(
		&c.ID,
		&c.Nom,
		&c.Description,
	)
	if err != nil {
		return c, err
	}
	return c, nil
}

func CreateCategorie(c models.Categorie) error {
	query := `INSERT INTO categories (nom, description) VALUES ($1, $2)`
	_, err := config.DB.Exec(query, c.Nom, c.Description)
	if err != nil {
		log.Println("Error inserting categorie:", err)
		return err
	}
	return nil
}

func DeleteCategorie(id int) error {
	query := `DELETE FROM categories WHERE id_categories=$1`
	_, err := config.DB.Exec(query, id)
	if err != nil {
		log.Println("Error deleting categorie:", err)
		return err
	}
	return nil
}

func UpdateCategorie(id int, c models.Categorie) error {
	query := `UPDATE categories SET nom=$1, description=$2 WHERE id_categories=$3`
	_, err := config.DB.Exec(query, c.Nom, c.Description, id)
	if err != nil {
		log.Println("Error updating categorie:", err)
		return err
	}
	return nil
}
