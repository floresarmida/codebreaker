package handlers

import (
	"encoding/json"
	"net/http"
	"strings"
	"unicode"
)

//CaesarSolutions - Map of potential solutions (outputs of different keys)
type CaesarSolutions map[int]string

func caesar(cipher string) (CaesarSolutions, error) {
	solutions := make(CaesarSolutions)
	for i := 0; i <= 25; i++ {
		solutions[i] = strings.Map(
			func(r rune) rune {
				return shift(r, i)
			},
			cipher)
	}
	return solutions, nil
}

//Shift character, looping over alphabet if necessary.
func shift(r rune, key int) rune {
	if unicode.IsLetter(r) {
		sh := int(unicode.ToLower(r)) + key
		if sh > 'z' {
			return rune(sh - 26)
		} else if sh < 'a' {
			return rune(sh + 26)
		}
		return rune(sh)
	}
	return rune(r)
}

//DecodeHandler takes a cipher and returns an object with potential solutions.
func DecodeHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Add("Access-Control-Allow-Origin", "*")
	w.Header().Add("Content-Type", "application/json; charset=utf-8")

	//	Get query | FormValue handles POST cases: https://golang.org/pkg/net/http/#Request.FormValue
	cipher := r.FormValue("caesar")
	//	Handling poor queries
	if len(cipher) == 0 {
		http.Error(w,
			"Error - Incomplete cipher text",
			http.StatusBadRequest)
		return
	} else if len(cipher) > 255 {
		http.Error(w,
			"Error - Cipher exceeds limit of 255 characters.",
			http.StatusBadRequest)
		return
	}

	//Process cipher && handle errs
	solutions, err := caesar(cipher)
	if err != nil {
		http.Error(w, err.Error(),
			http.StatusBadRequest)
	}
	// Encode solution as a JSON object for user
	encoder := json.NewEncoder(w)
	if err := encoder.Encode(solutions); err != nil {
		http.Error(w, "JSON encoding error: "+err.Error(), http.StatusInternalServerError)
	}

}
