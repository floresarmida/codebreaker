package handlers

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"strings"

	"golang.org/x/net/html"
)

//openGraphPrefix is the prefix used for Open Graph meta properties
const openGraphPrefix = "og:"

//openGraphProps represents a map of open graph property names and values
type openGraphProps map[string]string

func getPageSummary(url string) (openGraphProps, error) {
	//Get request to the URL, return if err
	response, err := http.Get(url)
	if err != nil {
		return nil, err
	}
	//	Guarentee closure of stream
	defer response.Body.Close()

	//if the response StatusCode is >= 400
	//return an error, using the response's .Status
	//property as the error message
	if response.StatusCode != http.StatusOK {
		err = fmt.Errorf("%v", response.StatusCode)
		return nil, err
	}

	//	Return error if content type != text/html
	contentType := response.Header.Get("Content-Type")
	if !strings.HasPrefix(contentType, "text/html") {
		err = fmt.Errorf("Response was not text/html, instead %s", contentType)
		return nil, err
	}

	//	Instance for holding summary of OG props
	summary := make(openGraphProps)

	//	Tokenize HTML, extract OG props
	scanner := html.NewTokenizer(response.Body)
	for {
		tokenType := scanner.Next()
		//	Break on EoF or err
		if tokenType == html.ErrorToken {
			//	EoF Handling (anticipated, trigger return)
			if scanner.Err() == io.EOF {
				return summary, nil
			}
			//	Handle unanticipated tokenizer errors
			return summary, scanner.Err()
		}

		//	Read the next tag
		token := scanner.Token()
		//	Exit on </head>
		if token.Type == html.EndTagToken && token.Data == "head" {
			return summary, nil
		}

		//	Process <Meta> tag
		if token.Data == "meta" {
			//	Iterate through tag and extract OG attributes
			var property, content string
			for _, a := range token.Attr {
				key := a.Key
				val := a.Val
				switch key {
				//	Every OG tag has a property and content key
				case "property":
					//	Validate OG prefix, but discard it during assignment
					if strings.HasPrefix(val, openGraphPrefix) {
						property = val[len(openGraphPrefix):]
					}
				case "content":
					content = val
				}
			}
			//	If the props are valid (e.g. both exist), add to OG summary
			if property != "" && content != "" {
				summary[property] = content
			}
		}
	}

}

//SummaryHandler given a URL, returns OpenGraph props w/ JSON encoding
func SummaryHandler(w http.ResponseWriter, r *http.Request) {
	//   Access-Control-Allow-Origin: * | Permit cross-origin API calls
	w.Header().Add("Access-Control-Allow-Origin", "*")
	//   Content-Type: application/json; charset=utf-8 |	Inform client of response type (JSON)
	w.Header().Add("Content-Type", "application/json; charset=utf-8")

	//	Get URL query | FormValue handles POST cases
	//HINT: https://golang.org/pkg/net/http/#Request.FormValue
	url := r.FormValue("url")

	//	Case: No URL query
	if len(url) == 0 {
		http.Error(w, "Error - No URL query provided",
			http.StatusBadRequest)
		return
	}

	//	Generate OG page summary
	summary, err := getPageSummary(url)
	//	Handle HTTP errors if they arise
	if err != nil {
		http.Error(w, err.Error(),
			http.StatusBadRequest)
	}
	// Encode openGraphProps as a JSON object for user
	encoder := json.NewEncoder(w)
	if err := encoder.Encode(summary); err != nil {
		http.Error(w, "JSON encoding error: "+err.Error(), http.StatusInternalServerError)
	}

}
