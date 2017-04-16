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
	// Initialize a map of keys to solutions (make is like a new())
	solutions := make(CaesarSolutions)
	// Map all 25 potential shifts & the solutions
	for i := 0; i <= 25; i++ {
		solutions[i] = strings.Map(
			//	Runes are like chars, but accept more than UTF-8
			func(r rune) rune {
				return shift(r, i)
			},
			cipher)
	}
	//	Return solutions w/o errors
	return solutions, nil
}

//Shift character, looping over alphabet if necessary.
func shift(r rune, key int) rune {
	//	Shift letters, not symbols
	if unicode.IsLetter(r) {
		sh := int(unicode.ToLower(r)) + key
		if sh > 'z' {
			//	Shift to beginning of alphabet
			return rune(sh - 26)
		} else if sh < 'a' {
			//	Shift to end of alphabet
			return rune(sh + 26)
		}
		//	Return shifted char
		return rune(sh)
	}
	//	Return bare symbols
	return rune(r)
}

//CodebreakerHandler takes a cipher and returns an object with potential solutions.
//(Could return an array, but JSON is more extensible in the future)
func CodebreakerHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Add("Access-Control-Allow-Origin", "*")
	w.Header().Add("Content-Type", "application/json; charset=utf-8")

	//	Get query | FormValue handles POST cases
	cipher := r.FormValue("caesar")
	//	Handling blank and large queries
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
