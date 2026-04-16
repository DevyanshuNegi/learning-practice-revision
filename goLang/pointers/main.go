package main

import "fmt"

func changeNum (num* int) {
	*num = 5
	fmt.Println("int change num ", *num)

}

func change (&nums int) {
	
}
func main() {
	num:=1

	changeNum(&num)

	fmt.Println("after change ", num)
}