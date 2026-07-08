package bdd

import (
	"log"
	"upcycleconnect/api/config"
	"upcycleconnect/api/models"
)

func GetPrestationById(id int)(models.Prestation,error){
	var p models.Prestation
	query :=`SELECT id_prestation, nom, description, tarif, capacite_max, duree,date_creation, statut,COALESCE(id_categories,0),COALESCE(id_users,0) FROM prestation WHERE id_prestation=$1`
	err := config.DB.QueryRow(query,id).Scan(
		&p.ID,
		&p.Nom,
		&p.Description,
		&p.Tarif,
		&p.CapaciteMax,
		&p.Duree,
		&p.DateCreation,
		&p.Statut,
		&p.IDCategorie,
		&p.IDUser,
	)
	if err!= nil {
		return p,err
	}
	return p, nil
}
func GetAllPrestations() ([]models.Prestation,error) {
	prestations := make([]models.Prestation, 0)
	query := `SELECT id_prestation, nom, description, tarif, capacite_max, duree,date_creation, statut,COALESCE(id_categories,0),COALESCE(id_users,0) FROM prestation`
	rows, err := config.DB.Query(query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	for rows.Next(){
		var p models.Prestation
		err := rows.Scan(
		&p.ID,
		&p.Nom,
		&p.Description,
		&p.Tarif,
		&p.CapaciteMax,
		&p.Duree,
		&p.DateCreation,
		&p.Statut,
		&p.IDCategorie,
		&p.IDUser,
		)
		if err!=nil{
			log.Println("Error scanning row: :", err)
			continue
		}
		prestations = append(prestations,p)
		
	}
	if err = rows.Err(); err != nil {
		return nil, err
	}
	return prestations, nil
}
func CreatePrestation(prestation models.Prestation)error{
	query := `INSERT INTO prestation (nom, description, tarif, capacite_max, duree, statut, id_categories, id_users) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`
	_, err := config.DB.Exec(query,
	prestation.Nom,
	prestation.Description,
	prestation.Tarif,
	prestation.CapaciteMax,
	prestation.Duree,
	prestation.Statut,
	nullIfZero(prestation.IDCategorie),
	nullIfZero(prestation.IDUser),
	)
	if err != nil{
		log.Println("Error inserting prestation into database:", err)
		return err
	}
	return nil
}

func DeletePrestation(id int)error{
	query := `DELETE FROM "prestation"WHERE id_prestation = $1`
	_,err := config.DB.Exec(query,id)
	if err!=nil{
		log.Println("Error deleting prestation from database:",err)
		return err
	}
	return nil
}
func UpdatePrestation(id int, prestation models.Prestation) error {
	query := `UPDATE prestation SET nom=$1, description=$2, tarif=$3, capacite_max=$4, duree=$5, statut=$6, id_categories=$7, id_users=$8 WHERE id_prestation=$9`
	_, err := config.DB.Exec(query,
		prestation.Nom,
		prestation.Description,
		prestation.Tarif,
		prestation.CapaciteMax,
		prestation.Duree,
		prestation.Statut,
		nullIfZero(prestation.IDCategorie),
		nullIfZero(prestation.IDUser),
		id,
	)
	if err != nil {
		log.Println("Error updating prestation in database:", err)
		return err
	}
	return nil
}
