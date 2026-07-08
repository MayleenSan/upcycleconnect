package mailer

import (
	_ "embed"
	"fmt"
	"net/smtp"
	"os"
)

//go:embed verification_email.html
var emailTemplate string

func getenv(key, def string) string {
	if v := os.Getenv(key); v != "" {
		return v
	}
	return def
}

func SendVerificationEmail(to, token string) error {
	from := os.Getenv("SMTP_EMAIL")
	password := os.Getenv("SMTP_PASSWORD")
	host := getenv("SMTP_HOST", "smtp.gmail.com")
	port := getenv("SMTP_PORT", "587")
	baseURL := getenv("BACKEND_URL", "http://localhost:8085")

	link := baseURL + "/api/auth/verify?token=" + token

	subject := "Subject: Verifie ton compte UpcycleConnect\r\n"
	mime := "MIME-Version: 1.0\r\nContent-Type: text/html; charset=UTF-8\r\n\r\n"
	body := fmt.Sprintf(emailTemplate, link)
	msg := []byte(subject + mime + body)

	auth := smtp.PlainAuth("", from, password, host)
	return smtp.SendMail(host+":"+port, auth, from, []string{to}, msg)
}
