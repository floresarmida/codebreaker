package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/rckeller/codebreaker-api/apiserver/handlers"
)

const defaultPort = "80" //	Originally "80"
const defaultHost = ""   //	Or Localhost?

const (
	apiRoot        = "/v1/"
	apiCodebreaker = apiRoot + "codebreaker"
)

//	Sample query (port 8080):
//	http://localhost:8080/v1/summary?url=http://ogp.me/

//main is the main entry point for this program
func main() {
	// PORT - port number to listen on for HTTP requests (if not set, use defaultPort)
	port := os.Getenv("PORT")
	if len(port) == 0 {
		port = defaultPort
		fmt.Printf("PORT not defined in environment, defaulting to " + defaultPort + "\n")
	}
	// HOST - host address to respond to (if not set, leave empty, which means any host)
	host := os.Getenv("HOST")
	if len(host) == 0 {
		host = defaultHost
		fmt.Printf("HOST not defined in environment, defaulting to %s\n", defaultHost)
	}

	//	Handle Summary route
	//HINT: https://golang.org/pkg/net/http/#HandleFunc
	// http.HandleFunc(apiSummary, handlers.SummaryHandler)
	http.HandleFunc(apiCodebreaker, handlers.DecodeHandler)

	//	Start server, log Fatal errors
	//HINT: https://golang.org/pkg/net/http/#ListenAndServe
	serveLocation := host + ":" + port
	fmt.Printf("Server is live at %s...\n", serveLocation)
	log.Fatal(http.ListenAndServe(serveLocation, nil))

}
