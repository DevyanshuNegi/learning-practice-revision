package main

import (
	"fmt"
	"maps"
)


func main() {
	mp := make(map[string]int)

	mp["price"] = 30
	mp["age"] = 10

	maps.Equal(mp, mp)

	fmt.Println(len(mp))

	delete(mp, "price")

	fmt.Println(len(mp))
	fmt.Println(mp)

	sl := make([]int, 20)
	fmt.Println(sl)

	sl[0] = 39;
	sl[3] = 3
	sl[5] = 2

	sum:=0

	for num := range len(sl){
		sum+=sl[num]
	}

	fmt.Println("sum of val ", sum)
}

