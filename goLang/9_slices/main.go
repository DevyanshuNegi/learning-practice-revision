package main

import "fmt"

func main() {
	var nums = make([]int, 2, 4)

	fmt.Println(nums)
	fmt.Println(cap(nums))
	
	nums = append(nums, 5)
	nums = append(nums, 6)
	nums[0] = 5

	fmt.Println(nums)
	fmt.Println(cap(nums))


}