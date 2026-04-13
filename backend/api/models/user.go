package models

type User struct {
	ID        int    `json:"id_users"`
	FirstName string `json:"first_name"`
	LastName  string `json:"last_name"`
	Mail      string `json:"mail"`
	Password  string `json:"-"`
	Phone     string `json:"phone"`
	Address   string `json:"address"`
	CreatedAt string `json:"created_at"`
	Role      string `json:"role"`
	Language  string `json:"language"`
}