package bdd

import (
	"errors"
	"log"
	"upcycleconnect/api/config"
	"upcycleconnect/api/models"
)

func GetUserByMail(email string)(models.User, error){
	var user models.User
	query:=`SELECT id_users, first_name, last_name, mail, password, COALESCE(phone,''), COALESCE(address,''), created_at, role, language, verified FROM "users" WHERE mail=$1`
	err := config.DB.QueryRow(query, email).Scan(
		&user.ID,
		&user.FirstName,
		&user.LastName,
		&user.Mail,
		&user.Password,
		&user.Phone,
		&user.Address,
		&user.CreatedAt,
		&user.Role,
		&user.Language,
		&user.Verified,
	)
	if err != nil {
		return user,err
	}
	return user, nil
	

}
func GetAllUsers()([]models.User, error){
	users := make([]models.User, 0)
	query:=`SELECT id_users,first_name, last_name, mail, password, COALESCE(phone,''), COALESCE(address,''), created_at, role, language FROM "users"`
	rows, err := config.DB.Query(query)
	if err != nil{
		return nil,err
	}
	defer rows.Close()
	for rows.Next() {
		var u models.User
		err := rows.Scan(
			&u.ID,
			&u.FirstName,
			&u.LastName,
			&u.Mail,
			&u.Password,
			&u.Phone,
			&u.Address,
			&u.CreatedAt,
			&u.Role,
			&u.Language,
		)
		if err != nil {
			log.Println("Error scanning row: :", err)
			continue
		}
		users = append(users, u)
	}
	if err = rows.Err(); err != nil {
		return nil, err
	}
	return users, nil
}

func CreateUser(user models.User) error{
	query := `INSERT INTO "users" (first_name, last_name, mail, password, phone, address,role, language)VALUES($1, $2, $3, $4, $5, $6, $7, $8)`
	_, err := config.DB.Exec(query,
	user.FirstName,
	user.LastName,
	user.Mail,
	user.Password,
	user.Phone,
	user.Address,
	user.Role,
	user.Language,
	)
	if err != nil{
		log.Println("Error inserting user into database:", err)
		return err
	}
	return nil
}

func DeleteUser(id int)error{
	query := `DELETE FROM "users"WHERE id_users = $1`
	_, err := config.DB.Exec(query,id)
	if err != nil {
		log.Println(" Error deleting user from database:", err)
		return err
	}

	return nil
}
func UpdateUser(id int, user models.User)error{
	query := `UPDATE "users" SET first_name = $1 ,last_name = $2, mail = $3, phone = $4 ,address = $5, role = $6, language = $7 WHERE id_users = $8`
	_, err := config.DB.Exec(query, 
		user.FirstName, 
		user.LastName, 
		user.Mail, 
		user.Phone, 
		user.Address, 
		user.Role, 
		user.Language, 
		id,
	)
	if err != nil {
		log.Println("Error updating user in database",err)
		return err
	}
	return nil
}

func SetVerificationToken(mail, token string) error {
	query := `UPDATE "users" SET verified=false, verification_token=$1 WHERE mail=$2`
	_, err := config.DB.Exec(query, token, mail)
	if err != nil {
		log.Println("Error setting verification token:", err)
	}
	return err
}

func VerifyUserByToken(token string) error {
	query := `UPDATE "users" SET verified=true, verification_token=NULL WHERE verification_token=$1`
	res, err := config.DB.Exec(query, token)
	if err != nil {
		return err
	}
	n, _ := res.RowsAffected()
	if n == 0 {
		return errors.New("token invalide")
	}
	return nil
}


