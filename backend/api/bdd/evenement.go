package bdd

import (
	"log"
	"upcycleconnect/api/config"
	"upcycleconnect/api/models"
)

func GetAllEvenements() ([]models.Evenement, error) {
	evenements := make([]models.Evenement, 0)
	query := `SELECT id_evenement, nom, description, date_debut, date_fin, lieu, capacite_max, statut, COALESCE(id_users,0) FROM evenement`
	rows, err := config.DB.Query(query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	for rows.Next() {
		var e models.Evenement
		err := rows.Scan(
			&e.ID,
			&e.Nom,
			&e.Description,
			&e.DateDebut,
			&e.DateFin,
			&e.Lieu,
			&e.CapaciteMax,
			&e.Statut,
			&e.IDUser,
		)
		if err != nil {
			log.Println("Error scanning row:", err)
			continue
		}
		evenements = append(evenements, e)
	}
	if err = rows.Err(); err != nil {
		return nil, err
	}
	return evenements, nil
}

func GetEvenementById(id int) (models.Evenement, error) {
	var e models.Evenement
	query := `SELECT id_evenement, nom, description, date_debut, date_fin, lieu, capacite_max, statut, COALESCE(id_users,0) FROM evenement WHERE id_evenement=$1`
	err := config.DB.QueryRow(query, id).Scan(
		&e.ID,
		&e.Nom,
		&e.Description,
		&e.DateDebut,
		&e.DateFin,
		&e.Lieu,
		&e.CapaciteMax,
		&e.Statut,
		&e.IDUser,
	)
	if err != nil {
		return e, err
	}
	return e, nil
}

func CreateEvenement(e models.Evenement) error {
	query := `INSERT INTO evenement (nom, description, date_debut, date_fin, lieu, capacite_max, statut, id_users) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`
	_, err := config.DB.Exec(query,
		e.Nom,
		e.Description,
		e.DateDebut,
		e.DateFin,
		e.Lieu,
		e.CapaciteMax,
		e.Statut,
		nullIfZero(e.IDUser),
	)
	if err != nil {
		log.Println("Error inserting evenement:", err)
		return err
	}
	return nil
}

func DeleteEvenement(id int) error {
	query := `DELETE FROM evenement WHERE id_evenement=$1`
	_, err := config.DB.Exec(query, id)
	if err != nil {
		log.Println("Error deleting evenement:", err)
		return err
	}
	return nil
}

func UpdateEvenement(id int, e models.Evenement) error {
	query := `UPDATE evenement SET nom=$1, description=$2, date_debut=$3, date_fin=$4, lieu=$5, capacite_max=$6, statut=$7, id_users=$8 WHERE id_evenement=$9`
	_, err := config.DB.Exec(query,
		e.Nom,
		e.Description,
		e.DateDebut,
		e.DateFin,
		e.Lieu,
		e.CapaciteMax,
		e.Statut,
		nullIfZero(e.IDUser),
		id,
	)
	if err != nil {
		log.Println("Error updating evenement:", err)
		return err
	}
	return nil
}
