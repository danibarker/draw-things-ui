package main

import (
	"fmt"

	"golang.org/x/crypto/bcrypt"
)

func main() {
	// bigbit, err := HashPassword("password")
	// if err != nil {
	// 	fmt.Println(err)
	// }
	bigbit := []byte("$2a$10$120F/C1PyP.asg1x2CnTxuDn8qJ4OSxr2GUM7/5KqosOAfIme/Cwm")
	err := bcrypt.CompareHashAndPassword(bigbit, []byte("password"))
	if err != nil {
		fmt.Println(err)
	}
	fmt.Println(bigbit)
	fmt.Println("success")
	fmt.Println(string(bigbit))

}

func HashPassword(password string) ([]byte, error) {
	hashed, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		fmt.Println(err)
		return nil, err
	}
	return hashed, nil
}
