package main

import (
    "net/http"
)

func helloHandler(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("Hello, World!"))
}

func main() {
	http.HandleFunc("/", helloHandler)

	for {
		go http.ListenAndServe(":1338", nil)
	}
}
