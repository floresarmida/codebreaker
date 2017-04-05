package handlers

import (
	"fmt"
	"io"
	"log"
	"net/http"
	"strings"

	"golang.org/x/net/html"
)

type MetaData struct {
	Property string // Property attribute without prefix.
	Content  string // Content attribute. See http://ogp.me/#data_types for a list of content attribute types.
	Prefix   string
}

type openGraph struct {
	Title string `json:"title"`
	Type  string `json:"type"`
	Image string `json:"image"`
	URL   string `json:"url"`
}

//openGraphPrefix is the prefix used for Open Graph meta properties
const openGraphPrefix = "og:"

//openGraphProps represents a map of open graph property names and values
type openGraphProps map[string]string

// func getPageSummary(url string) (openGraphProps, error) {
func getPageSummary(url string) ([]MetaData, error) {
	//Get the URL
	//If there was an error, return it
	response, err := http.Get(url)
	if err != nil {
		log.Fatalf("Error fetching URL: %v\n", err)
	}

	//ensure that the response body stream is closed eventually
	//HINTS: https://gobyexample.com/defer
	//https://golang.org/pkg/net/http/#Response
	defer response.Body.Close()

	//if the response StatusCode is >= 400
	//return an error, using the response's .Status
	//property as the error message
	if response.StatusCode != http.StatusOK {
		log.Fatalf("Response status code: %d\n", response.StatusCode)
	}

	//	Return error if content type != text/html
	contentType := response.Header.Get("Content-Type")
	if !strings.HasPrefix(contentType, "text/html") {
		log.Fatalf("Response was not text/html, instead %s\n", contentType)
	}

	//create a new openGraphProps map instance to hold
	//the Open Graph properties you find
	//(see type definition above)
	// ogProps := make(openGraphProps)
	// fmt.Printf(ogProps)

	//tokenize the response body's HTML and extract
	//any Open Graph properties you find into the map,
	//using the Open Graph property name as the key, and the
	//corresponding content as the value.
	//strip the openGraphPrefix from the property name before
	//you add it as a new key, so that the key is just `title`
	//and not `og:title` (for example).

	//HINTS: https://info344-s17.github.io/tutorials/tokenizing/
	//https://godoc.org/golang.org/x/net/html

	// scanner := html.NewTokenizer(response.Body)
	var tags []MetaData
	scanner := html.NewTokenizer(response.Body)
	for {
		tt := scanner.Next()
		//	EoF Handling
		if tt == html.ErrorToken {
			if scanner.Err() == io.EOF {
				return tags, nil
			}
			return nil, scanner.Err()
		}

		//	Read the next open tag
		t := scanner.Token()
		//	Exit once we finish the head (metadata) parent tag
		if t.Data == "head" && t.Type == html.EndTagToken {
			return tags, nil
		}

		//	<Meta>
		if t.Data == "meta" {
			//	Iterate through tag and extract OG properties
			var property, content, tagPrefix string
			for _, a := range t.Attr {
				key := a.Key
				val := a.Val
				switch key {
				case "property":
					if strings.HasPrefix(val, openGraphPrefix) {
						property = val
						// fmt.Printf(property[len(openGraphPrefix):] + "\n")
					}
				case "content":
					content = val
					// fmt.Printf("CONTENT: " + content + "\n")
				}
			}

			//	Throw away this tag if the data is misformatted
			if property == "" || content == "" {
				continue
			}

			//	MANUAL TESTING: toString the data
			fmt.Printf(property + " = " + content + "\n")

			// fmt.Printf(tagPrefix)
			idx := strings.Index(property, ":")
			if idx == -1 {
				continue
			}
			tagPrefix = property[:idx]

			tags = append(tags, MetaData{property[len(tagPrefix+":"):], content, tagPrefix})
		}

	}

	return nil, nil

}

//SummaryHandler fetches the URL in the `url` query string parameter, extracts
//summary information about the returned page and sends those summary properties
//to the client as a JSON-encoded object.
func SummaryHandler(w http.ResponseWriter, r *http.Request) {
	//   Access-Control-Allow-Origin: * | Permit cross-origin API calls
	w.Header().Add("Access-Control-Allow-Origin", "*")

	//	Get URL query | FormValue handles POST cases
	//HINT: https://golang.org/pkg/net/http/#Request.FormValue
	url := r.FormValue("url")
	// name := r.URL.Query().Get("name")

	//if no `url` parameter was provided, respond with
	//an http.StatusBadRequest error and return
	//HINT: https://golang.org/pkg/net/http/#Error
	if len(url) == 0 {
		http.Error(w, http.StatusText(http.StatusBadRequest),
			http.StatusBadRequest)
	}

	//call getPageSummary() passing the requested URL
	//and holding on to the returned openGraphProps map
	//(see type definition above)
	//	TODO: Use openGraphProps type
	_, err := getPageSummary(url)
	// summary, err := getPageSummary(url)

	//if you get back an error, respond to the client
	//with that error and an http.StatusBadRequest code
	if err != nil {
		http.Error(w, http.StatusText(http.StatusBadRequest),
			http.StatusBadRequest)
	}

	//otherwise, respond by writing the openGrahProps
	//map as a JSON-encoded object
	//	TODO

	//   Content-Type: application/json; charset=utf-8 |	Inform client of response type (JSON)
	w.Header().Add("Content-Type", "application/json; charset=utf-8")

}
