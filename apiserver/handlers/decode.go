package handlers

import (
	"encoding/json"
	"net/http"
	"strings"
	"unicode"
)

//Solutions - Map of potential solutions (outputs of different keys)
type Solutions map[int]string

func shift(r rune, key int) rune {
	//	Shift character, looping over alphabet if necessary.
	sh := int(unicode.ToLower(r)) + key
	if sh > 'z' {
		return rune(sh - 26)
	} else if sh < 'a' {
		return rune(sh + 26)
	}
	return rune(sh)
}

func caesar(cipher string) (Solutions, error) {
	solutions := make(Solutions)
	for i := 0; i <= 25; i++ {
		solutions[i] = strings.Map(
			func(r rune) rune {
				return shift(r, i)
			},
			cipher)
	}

	return solutions, nil
}

//DecodeHandler given a URL, returns OpenGraph props w/ JSON encoding
func DecodeHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Add("Access-Control-Allow-Origin", "*")
	w.Header().Add("Content-Type", "application/json; charset=utf-8")

	//	Get URL query | FormValue handles POST cases: https://golang.org/pkg/net/http/#Request.FormValue
	cipher := r.FormValue("caesar")

	//	Handling poor queries
	if len(cipher) == 0 {
		http.Error(w, "Error - Incomplete cipher text",
			http.StatusBadRequest)
		return
	} else if len(cipher) > 255 {
		http.Error(w, "Error - Cipher exceeds limit of 255 characters.",
			http.StatusBadRequest)
		return
	}

	//Process cipher
	solutions, err := caesar(cipher)

	//	Generate OG page summary
	// summary, err := getPageSummary(cipher)
	//	Handle HTTP errors if they arise
	if err != nil {
		http.Error(w, err.Error(),
			http.StatusBadRequest)
	}
	// Encode openGraphProps as a JSON object for user
	encoder := json.NewEncoder(w)
	if err := encoder.Encode(solutions); err != nil {
		http.Error(w, "JSON encoding error: "+err.Error(), http.StatusInternalServerError)
	}

}
