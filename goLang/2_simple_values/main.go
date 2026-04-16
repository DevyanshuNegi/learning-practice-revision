package main


func main() {
	var s string = "name"
	a := "name"


	println(a, s)

	// for loop in go
	// i:=0
	// for i<=4 {
	// 	println(i)
	// 	i++
	// }

	for i := 0; i<=4; i++ {
		if (i==3) {
			continue
		}
		println(i)

	}


	// range
	for i := range 3 {
		println(i)
	}

	
}