package main

import (
	"fmt"
	// "time"
)

// import {

// 	"time"
// 	"math/rand"
// }
// FOR SENDING DATA USING CHANNELS
// We just go function to make it run it seprately
// then we just send messages to it

// func processNum(numChan chan int) {
// 	fmt.Println("processing number ", <-numChan)

// 	for num := range numChan {
// 		fmt.Println("Processign number ", num)
// 		time.Sleep(time.Second)
// 	}
// }

// func main() {
// 	numChan := make(chan int)

// 	go processNum(numChan)

// 	for {
// 		// numChan <- rand.Int(100)
// 		numChan <- rand.Intn(100)

// 	}

// messageChan := make(chan string)

// messageChan <- "ping"
// // channels are blocking
// // until second side of pipe is not ready to recieve
// // we have to make it recieve

// msg := <-messageChan

// fmt.Println(msg)

// }

// func sum(result chan int, num1, num2 int) {
// 	newresult := num1 + num2
// 	result <- newresult
// }

// func main() {
// 	result := make (chan int)

// 	go sum(result, 5, 2)

// 	res := <-result
// 	fmt.Println(res)
// }

// goroutine synchroniser

// func task(done chan bool) {
// 	defer func () {
// 		done<-true
// 	} ()

// 	fmt.Println("Processsing .. ")
// }

// func main () {
// 	done := make(chan bool)

// 	go task(done)

// 	isdone := <-done
// 	// blocking
// 	// blocks until someone sends data from the function
// 	// same things can be done using weight group
// 	// we generally use channel for single go rouutine or thread

// 	fmt.Println("done ", isdone)

// }

// func main() {

// 	// in normal channels, it would be blocking
// 	// and we have to wait until the data is recieved
// 	// but we can use buffer channels for sending data together
// 	// and without blocking
// 	// best use for queueing system

// 	emailChan := make(chan string, 100)
// 	// in real life we would be sending struct

// 	emailChan <- "1@example.com"
// 	emailChan <- "another mail"

// 	fmt.Println(<-emailChan)
// 	fmt.Println(<-emailChan)

// }





//  			here we can make sendonly and recieven only channel

// func emailSender (emailChan <-chan string, doneChan chan<- bool) {

// func emailSender (emailChan chan string, doneChan chan bool) {

// 	defer func () { 
// 		doneChan <- true 
// 	} ()

// 	for email := range emailChan {
// 		fmt.Println("sending email to ", email)
// 	}

// }

// func main() {

// 	// fmt.Println("Started the code ")
// 	emailChan := make(chan string, 10)
// 	doneChan := make(chan bool)

// 	go emailSender (emailChan, doneChan)

// 	for i:=range 10 {
// 		// emailChan <- i+example.com"
// 		emailChan <- fmt.Sprintf("%d@gmail.com", i)
// 		time.Sleep(time.Second)
// 	}

// 	fmt.Println("done sending ")

// 	close(emailChan)

// 	isdone := <-doneChan
// 	fmt.Println(isdone)

// }








func main() {
	chan1 := make(chan int)
	chan2 := make(chan string)

	go func () {
		chan1 <- 10
	} ()

	go func () {
		chan2 <- "pong"
	} ()

	
	for i:=0; i<2; i++ {
		select {
		case chan1Val := <- chan1:
			fmt.Println("Recieved data from chan 1 ", chan1Val)
		case chan2Val := <- chan2:
			fmt.Println("Recieved data from chan 2 ", chan2Val)
		}
	}
}

