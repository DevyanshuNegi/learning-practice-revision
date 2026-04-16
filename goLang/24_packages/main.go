package main

import (
	"fmt"
	"github.com/devyanshu/24_packages/auth"
	"github.com/devyanshu/24_packages/user"
)

// import (
// 	"./auth"
// )

func main() {
	auth.LoginWithCreds("john", "password123")
	session := auth.GetSession()
	fmt.Println("session ", session)

	
	user := user.User{
		Email: "user@gmail.com",
		Name: "John Doe",
	}

	fmt.Println(user)
}
