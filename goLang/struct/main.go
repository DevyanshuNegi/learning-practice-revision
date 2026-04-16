package main

import (
	"fmt"
	"time"
)

type order struct{
	name string
	cost float32
	status string
	createdAt time.Time
}

// reviever type

func (o *order) changeStatus(status string) {
	o.status = status
}

func newOrder(name string, cost float32, status string, createdAt time.Time) *order {
	ord := order {
		name: name,
		cost: cost,
		status: status,
		createdAt: createdAt,
	}
	return &ord
}

func main() {

	ord := newOrder("negi", 45345, "done", time.Now())

	fmt.Println(ord)
	

}