package main

import (
	"fmt"
	"sync"
)

// Race condition when two processes are tyring to mod a res at the same time

type post struct {
	views int
	mu sync.Mutex
}

func (p *post) inc(wg *sync.WaitGroup) {
	// defer wg.Done()
	defer func() {
		wg.Done()
		p.mu.Unlock()
	} ()


	//  here we are locing it using mutex
	p.mu.Lock()
	p.views+=1
}

func main() {
	myPost := post{views:0}
	var wg sync.WaitGroup

	for i:=0; i<200; i++ {
		wg.Add(1)
		go myPost.inc(&wg)

	}
	wg.Wait()
	fmt.Println(myPost.views)

}