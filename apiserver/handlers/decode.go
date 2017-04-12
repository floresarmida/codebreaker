package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strings"
	"unicode"
)

//Solutions - Map of potential solutions (outputs of different keys)
// type Solutions map[int]string
type Solutions [25]string

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
	var solutions [25]string
	// solutions := make(Solutions)
	solutions[1] = "Test Passed"
	solutions[2] = "Test 2"
	fmt.Println(solutions[1] + "\n" + solutions[2])
	shiftOnce := strings.Map(
		func(r rune) rune {
			return shift(r, 1)
		},
		cipher)
	fmt.Println("Cipher & Solution\n" + cipher + "\n" + shiftOnce)
	return solutions, nil
}

//DecodeHandler given a URL, returns OpenGraph props w/ JSON encoding
func DecodeHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Add("Access-Control-Allow-Origin", "*")
	w.Header().Add("Content-Type", "application/json; charset=utf-8")

	//	Get URL query | FormValue handles POST cases: https://golang.org/pkg/net/http/#Request.FormValue
	cipher := r.FormValue("cipher")

	//	Handling poor queries
	if len(cipher) == 0 {
		http.Error(w, "Error - Incomplete cipher",
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
