package main

import (
	"bufio"
	"fmt"
	"net"
	"strings"
	"time"
)

func main() {
	// --- CONFIGURATION ---
	// 1. The email you want to "test" verify
	targetEmail := "deven8080@gmail.com" 
	
	// 2. YOUR domain (Must be real, or Gmail might block the handshake)
	senderDomain := "gmail.com" 
	senderEmail := "devyanshunegi@" + senderDomain
	// ---------------------

	fmt.Printf("🚀 Starting Verification Probe for: %s\n", targetEmail)

	// Step 1: Extract Domain
	parts := strings.Split(targetEmail, "@")
	if len(parts) != 2 {
		fmt.Println("❌ Invalid email format")
		return
	}
	domain := parts[1]

	// Step 2: MX Lookup
	fmt.Printf("🔍 Looking up MX records for %s...\n", domain)
	mxRecords, err := net.LookupMX(domain)
	if err != nil || len(mxRecords) == 0 {
		fmt.Printf("❌ MX Lookup Failed: %v\n", err)
		return
	}
	
	// Use the highest priority MX server
	mxHost := mxRecords[0].Host
	fmt.Printf("✅ Found MX Server: %s\n", mxHost)

	// Step 3: Connect to Port 25
	// We use a timeout to ensure we don't hang if blocked
	address := fmt.Sprintf("%s:25", mxHost)
	fmt.Printf("🔌 Connecting to %s on Port 25...\n", address)
	
	conn, err := net.DialTimeout("tcp", address, 5*time.Second)
	if err != nil {
		fmt.Printf("❌ CONNECTION REFUSED: Port 25 is blocked on this VPS.\n")
		fmt.Printf("Error: %v\n", err)
		return
	}
	defer conn.Close()
	
	// Prepare to read server responses
	reader := bufio.NewReader(conn)
	
	// Helper function to read server response
	readResponse := func() string {
		line, _ := reader.ReadString('\n')
		fmt.Printf("Server: %s", line)
		return line
	}

	// Helper function to send command
	sendCommand := func(cmd string) {
		fmt.Printf("Client: %s", cmd)
		fmt.Fprintf(conn, cmd)
	}

	// --- SMTP HANDSHAKE ---
	
	// 1. Read Initial Banner
	readResponse()

	// 2. Send HELO/EHLO
	sendCommand(fmt.Sprintf("HELO %s\r\n", senderDomain))
	readResponse()

	// 3. Send MAIL FROM
	sendCommand(fmt.Sprintf("MAIL FROM:<%s>\r\n", senderEmail))
	resp := readResponse()
	if strings.HasPrefix(resp, "5") {
		fmt.Println("❌ Blocked at MAIL FROM (IP likely blacklisted)")
		return
	}

	// 4. Send RCPT TO (The actual check)
	sendCommand(fmt.Sprintf("RCPT TO:<%s>\r\n", targetEmail))
	resp = readResponse()

	// 5. Analyze Result
	if strings.HasPrefix(resp, "250") || strings.HasPrefix(resp, "251") {
		fmt.Println("-------------------------------------------")
		fmt.Println("✅ RESULT: Valid / Deliverable")
		fmt.Println("The server accepted the recipient.")
	} else if strings.HasPrefix(resp, "550") {
		fmt.Println("-------------------------------------------")
		fmt.Println("❌ RESULT: Invalid / Does Not Exist")
		fmt.Println("The server rejected the recipient.")
	} else {
		fmt.Println("-------------------------------------------")
		fmt.Printf("⚠️ RESULT: Unknown / Greylisted (Code: %s)\n", resp[:3])
	}

	// 6. QUIT (Polite exit)
	sendCommand("QUIT\r\n")
	readResponse()
}