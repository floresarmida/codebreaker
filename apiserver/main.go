package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/info344-s17/challenges-RcKeller/apiserver/handlers"
)

// const defaultPort = "80"
const defaultPort = "8080"

//localhost:8080

//	Sample query using port 4000:
//	http://localhost:4000/v1/summary?url=http://ogp.me/ (Links to an external site.)

const (
	apiRoot    = "/v1/"
	apiSummary = apiRoot + "summary"
)

//main is the main entry point for this program
func main() {
	//read and use the following environment variables
	//when initializing and starting your web server
	// PORT - port number to listen on for HTTP requests (if not set, use defaultPort)
	port := os.Getenv("PORT")
	if len(port) == 0 {
		port = defaultPort
		fmt.Printf("PORT not defined in environment, defaulting to " + defaultPort + "\n")
	}
	port = "localhost:" + port
	// HOST - host address to respond to (if not set, leave empty, which means any host)
	host := os.Getenv("HOST")
	if len(host) == 0 {
		host = ""
		fmt.Printf("HOST not defined in environment, defaulting to none\n")
	}

	//add your handlers.SummaryHandler function as a handler
	//for the apiSummary route
	//HINT: https://golang.org/pkg/net/http/#HandleFunc
	http.HandleFunc(apiSummary, handlers.SummaryHandler)

	fmt.Printf("Server is live at %s...\n", port)

	//start your web server and use log.Fatal() to log
	//any errors that occur if the server can't start
	//HINT: https://golang.org/pkg/net/http/#ListenAndServe
	log.Fatal(http.ListenAndServe(port, nil))

}
