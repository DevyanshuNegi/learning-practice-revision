package main

import (
	// "context"
	"fmt"
	"log"
	"net"
	"net/http"
	"net/mail"
	"strings"
	"time"
)

// ValidateRequest holds input
type ValidateRequest struct {
	Email string `json:"email"`
}

// ValidationResult holds response
type ValidationResult struct {
	Email     string `json:"email"`
	Syntax    bool   `json:"syntax"`
	HasMX     bool   `json:"has_mx"`
	SMTPAlive bool   `json:"smtp_alive"`
}

// basic email syntax check
func checkSyntax(email string) bool {
	_, err := mail.ParseAddress(email) // RFC syntax check
	return err == nil
}

// lookup MX records
func lookupMX(domain string) ([]*net.MX, error) {
	// use default resolver
	return net.LookupMX(domain)
}

// basic SMTP check (connect & RCPT TO)
func smtpProbe(mxHost, email string) bool {
	conn, err := net.DialTimeout("tcp", mxHost+":25", 3*time.Second)
	if err != nil {
		return false
	}
	defer conn.Close()

	conn.SetDeadline(time.Now().Add(4 * time.Second))

	// simple SMTP handshake
	fmt.Fprintf(conn, "EHLO validator.local\r\n")
	fmt.Fprintf(conn, "MAIL FROM:<validator@local>\r\n")
	fmt.Fprintf(conn, "RCPT TO:<%s>\r\n", email)
	fmt.Fprintf(conn, "QUIT\r\n")

	return true
}

func validateEmailHandler(w http.ResponseWriter, r *http.Request) {
	email := r.URL.Query().Get("email")
	result := ValidationResult{Email: email}

	// syntax
	result.Syntax = checkSyntax(email)
	if !result.Syntax {
		fmt.Fprintf(w, "%+v", result)
		return
	}

	// extract domain
	parts := strings.Split(email, "@")
	if len(parts) != 2 {
		fmt.Fprintf(w, "%+v", result)
		return
	}
	domain := parts[1]

	// MX lookup
	mxRecords, err := lookupMX(domain)
	if err == nil && len(mxRecords) > 0 {
		result.HasMX = true

		// SMTP probe (simple)
		// note: use first MX only to reduce throughput
		result.SMTPAlive = smtpProbe(mxRecords[0].Host, email)
	}

	fmt.Fprintf(w, "%+v", result)
}

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("/validate", validateEmailHandler)

	srv := &http.Server{
		Addr:         ":8080",
		Handler:      mux,
		ReadTimeout:  5 * time.Second,
		WriteTimeout: 5 * time.Second,
	}

	log.Println("Validator running on :8080")
	log.Fatal(srv.ListenAndServe())
}
