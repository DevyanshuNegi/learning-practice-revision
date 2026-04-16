package main

func main() {
	// age := 30

	// if age>18 {
	// 	println("allowed to vote")
	// } else if age >12 {
	// 	println("person is teen")
	// } else {
	// 	println("not allowed to vote")
	// }

	// role := "admin"

	// var hasPermission = true

	// if role == "admin" || hasPermission {
	// 	println("YES")

	// }

	if age:= 15; age>18 {
		println("adult")
	} else if age>12 {
		println("is teen")
	} else {
		println("is kid")
	}

	age:=30
	switch age {
	case 10:
		print(10)
	case 30:
		print(30)
	case 40:
		print(40)
	default:
		print(100)
	}

	// type switch
	whoAmI := func(i interface{}) {
		switch t:=i.(type) {
		case int:
			print("int", t)
		case string:
			print("strig")
		case bool:
			print("bool")
		default:
			print("nothing")
	}
	}
	whoAmI(44)

}