package main

import (
	"fmt"
	"net"
	"os"
)


func main() {
	listener, err := net.Listen("tcp", ":3000")
	if err != nil {
		fmt.Println("error starting server : ", err)
		os.Exit(1);
	}

	defer listener.Close()

	fmt.Print("server running on port 3000")

	for {
		// blocking
		conn, err := listener.Accept()
		if err != nil {
			fmt.Println("Connection error : ", err)
		}
	
		go handleConnection(conn);

	}

	// blocking
	
}


func handleConnection(conn net.Conn) {
	defer conn.Close()

	fmt.Printf("Client connected: %s\n", conn.RemoteAddr());

	conn.Write()

}