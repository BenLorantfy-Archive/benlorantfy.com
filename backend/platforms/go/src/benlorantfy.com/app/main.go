package main

import (
    "github.com/emicklei/go-restful"
    "log"
    "net/http"
	"fmt"
)

func main() {
	fmt.Printf("[main.go] Starting Web Server\n")
    fmt.Printf("[main.go] Listening on port 5000\n")
    restful.Add(CreateApi())
    log.Fatal(http.ListenAndServe(":5000", nil))
}