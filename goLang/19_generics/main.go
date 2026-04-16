package main

import "fmt"

func printSlice[T any](items [] T) {
	for _, item := range items {
		fmt.Println(item)
	}
}

func main () {

	names := []string{"golang", "ts"}
	printSlice(names)

}