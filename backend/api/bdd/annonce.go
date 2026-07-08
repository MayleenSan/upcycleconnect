package bdd

import (
	"log"
	"upcycleconnect/api/config"
	"upcycleconnect/api/models"
)

func GetAnnonceById(id int)(models.Annonce,error){
	var p models.Annonce
	query :=`SELECT id_annonce, titre ,description , prix, etat, statut, date_creation, COALESCE(id_categories,0), COALESCE(id_users,0) FROM Annonce WHERE id_annonce=$1`
	err := config.DB.QueryRow(query,id).Scan(
		&p.ID,
		&p.Titre,
		&p.Description,
		&p.Prix,
		&p.Etat,
		&p.Statut,
		&p.DateCreation,
		&p.IDCategorie,
		&p.IDUser,

	)
	if err!= nil{
		return p,err
	}
	return p, nil
}
func GetAllAnnonces()([]models.Annonce,error){
	annonces := make([]models.Annonce,0)
	query :=`SELECT id_annonce, titre ,description , prix, etat, statut, date_creation, COALESCE(id_categories,0), COALESCE(id_users,0) FROM Annonce`
	rows, err := config.DB.Query(query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	for rows.Next(){
		var a models.Annonce
		err := rows.Scan(
			&a.ID,
			&a.Titre,
			&a.Description,
			&a.Prix,
			&a.Etat,
			&a.Statut,
			&a.DateCreation,
			&a.IDCategorie,
			&a.IDUser,
		)
		if err != nil {
			log.Println("Error scanning row:", err)
			continue
		}
		annonces = append(annonces, a)
	}
	if err = rows.Err(); err != nil {
		return nil, err
	}
	return annonces, nil
}

func GetAnnoncesByUser(userID int) ([]models.Annonce, error) {
	annonces := make([]models.Annonce, 0)
	query := `SELECT id_annonce, titre, description, prix, etat, statut, date_creation, COALESCE(id_categories,0), COALESCE(id_users,0) FROM annonce WHERE id_users=$1`
	rows, err := config.DB.Query(query, userID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	for rows.Next() {
		var a models.Annonce
		err := rows.Scan(
			&a.ID,
			&a.Titre,
			&a.Description,
			&a.Prix,
			&a.Etat,
			&a.Statut,
			&a.DateCreation,
			&a.IDCategorie,
			&a.IDUser,
		)
		if err != nil {
			log.Println("Error scanning row:", err)
			continue
		}
		annonces = append(annonces, a)
	}
	if err = rows.Err(); err != nil {
		return nil, err
	}
	return annonces, nil
}

func CreateAnnonce(annonce models.Annonce)error{
	query := `INSERT INTO annonce (titre, description, prix, etat, statut, id_categories, id_users) VALUES ($1, $2, $3, $4, $5, $6, $7)`
	_, err := config.DB.Exec(query,
		annonce.Titre,
		annonce.Description,
		annonce.Prix,
		annonce.Etat,
		annonce.Statut,
		nullIfZero(annonce.IDCategorie),
		nullIfZero(annonce.IDUser),
	)
	if err != nil{
		log.Println("Error inserting annonce into database:", err)
		return err
	}
	return nil
}

func UpdateAnnonce(id int, annonce models.Annonce) error {
	query := `UPDATE annonce SET titre=$1, description=$2, prix=$3, etat=$4, statut=$5, id_categories=$6, id_users=$7 WHERE id_annonce=$8`
	_, err := config.DB.Exec(query,
		annonce.Titre,
		annonce.Description,
		annonce.Prix,
		annonce.Etat,
		annonce.Statut,
		nullIfZero(annonce.IDCategorie),
		nullIfZero(annonce.IDUser),
		id,
	)
	if err != nil {
		log.Println("Error updating annonce in database:", err)
		return err
	}
	return nil
}

func DeleteAnnonce(id int) error {
	query := `DELETE FROM annonce WHERE id_annonce=$1`
	_, err := config.DB.Exec(query, id)
	if err != nil {
		log.Println("Error deleting annonce from database:", err)
		return err
	}
	return nil
}