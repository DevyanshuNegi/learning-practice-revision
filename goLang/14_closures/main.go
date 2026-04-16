package main

import "fmt"


func counter() func() int {
	var count int = 0

	return func() int {
		count += 1

		return count
	}
}

func count() {
	for i := range 10 {
		fmt.Println(i)
	}
}

func main() {
	increment := counter()

	fmt.Println(increment())
	fmt.Println(increment())

	l := make([]int, 3)
	
	go count()
	go count()
	go count()

	fmt.Println(l);
}