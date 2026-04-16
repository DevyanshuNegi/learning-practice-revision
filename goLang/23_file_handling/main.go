package main

import (
	"bufio"
	"fmt"
	"os"
	// "strings"
)

func main() {
	// f, err := os.Open("example.txt")

	// if(err != nil) {
	// 	// log the errror
	// 	panic(err)
	// }

	// fileInfo, err := f.Stat()
	// if err != nil {
	// 	panic(err)
	// }

	// fmt.Println (fileInfo)
	// fmt.Println(fileInfo.Size())









// 	f, err := os.Open("example.txt")

// 	if err != nil {
// 		panic(err)
// 	}

// 	defer f.Close()

// 	buff := make([]byte, 10)

// 	d, err := f.Read(buff)


// 	for i:=0; i<len(buff); i++ {
// 		println("data", d, string(buff[i]))
// 	}

// 	fmt.Println(d, string(buff))

// // this is not good for large files but vvv good for small files
// 	data, err := os.ReadFile("example.txt")

// 	fmt.Println(string(data))






	// // reading folder
	// dir, err := os.Open(".")
	// if(err != nil) {panic(err)}

	// defer dir.Close()

	// fileInfo, err := dir.ReadDir(1)

	// for _, fi := range fileInfo {
	// 	fmt.Println(fi.Name())
	// }









// create a file
	// f, err := os.Create("example2.txt")
	// if(err!=nil) {panic(err)}

	// defer f.Close()
	// // f.WriteString("Hi go")
	// // f.WriteString("Hi go")
	// bytes := []byte("Hello Golang")
	// n, err := f.Write(bytes)





	// read and write to anotehr file (streaming fassion)

	sourceFile, err := os.Open("example.txt")
	if err!=nil {
		panic(err)
	}
	defer sourceFile.Close()

	destFile, err := os.Create("example2.txt")
	if err!=nil {
		panic(err)
	}
	defer destFile.Close()

	
	reader := bufio.NewReader(sourceFile)
	writer := bufio.NewWriter(destFile)

	for {
		b,err := reader.ReadByte()
		if err != nil {
			if err.Error() != "EOF" {
				panic(err)
			}
			break
		}
		e := writer.WriteByte(b)
		if e != nil {
			panic(e)
		}
	}

	writer.Flush()
	fmt.Println("Written to file successfully ")
	



	fmt.Print("HELLO")
}
