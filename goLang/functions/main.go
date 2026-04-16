package main

import "fmt"

func sum(nums ... int) int {
	var total int
	for _, num:= range nums {
		total = total + num
	}
	return total
}

func main() {
	nums := []int {2, 3,4 , 5, 5}

	fmt.Println(sum(nums...))

}
