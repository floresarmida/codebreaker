package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/rckeller/codebreaker-api/apiserver/handlers"
)

const defaultPort = "80"
const defaultHost = "" //Becomes 127.0.0.1 or localhost dep on OS
const (
	version = "/v1/"
	apiName = version + "codebreaker"
)

//	For a sample query, run the following:
//	export HOST="localhost" && PORT="8080"
//	http://localhost:8080/v1/codebreaker?caesar=abc

//main is the main entry point for this program
func main() {
	// HOST - host address to respond to
	host := os.Getenv("HOST")
	if len(host) == 0 {
		host = defaultHost
		fmt.Printf("HOST not defined in environment, defaulting to undefined (localhost or 127.0.0.1)")
	}
	// PORT - port number to expose
	port := os.Getenv("PORT")
	if len(port) == 0 {
		port = defaultPort
		fmt.Printf("PORT not defined in environment, defaulting to " + defaultPort + "\n")
	}
	serveLocation := host + ":" + port

	//	Handle codebreaker API calls
	http.HandleFunc(apiName, handlers.CodebreakerHandler)

	//	Start server, log Fatal errors
	fmt.Printf("Server is live at %s...\n", serveLocation)
	log.Fatal(http.ListenAndServe(serveLocation, nil))

}
