package bdd

import (
	"log"
	"upcycleconnect/api/config"
	"upcycleconnect/api/models"
)

func GetAnnonceById(id int)(models.Annonce,error){
	var p models.Annonce
	query :=`SELECT id_annonce, titre ,description , prix, etat, statut, date_creation, id_categories, id_users FROM Annonce WHERE id_annonce=$1`
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
func GetAllAnnonce()(models.Annonce,error){
	annonces := make([]models.Annonce,0)
	query :=`SELECT id_annonce, titre ,description , prix, etat, statut, date_creation, id_categories, id_users FROM Annonce`
	rows, err := config.DB.QueryRow(query)
	if err != nil {
		return nil, err
	}
	defer rows.Next(){

	}
}