package main

import (
	"fmt"
	"sync"
	"time"
)

func task(n int, wg *sync.WaitGroup) {
	defer wg.Done()

	fmt.Println(n)
}

func main() {
	var wg sync.WaitGroup

	for i := range 10 {
		wg.Add(1)
		go task(i, &wg)
	}
	// time.Sleep(2000)
	wg.Wait()
	time.Sleep(1000)
}
