package main

import (
	"encoding/json"
	"html/template"
	"log"
	"net/http"
	"os"
	"path/filepath"
	s "strings"
)

func ternaryu[T any](i int, req, res T) T {
	if i == 0 {
		return res
	}
	return req
}

func serveTemplateu(w http.ResponseWriter, r *http.Request) {
	lp := filepath.Join("www/ware", "layout.html")
	u := ternaryu(s.Compare(r.URL.Path, "/"), r.URL.Path, "index")
	fp := filepath.Join("www/work", filepath.Clean(u))
	fp += ".html"
	// log.Print(u, fp)
	/* Return a 404 if the template doesn't exist /// */
	info, err := os.Stat(fp)
	if err != nil {
		if os.IsNotExist(err) {
			http.NotFound(w, r)
			return
		}
	}

	/* Return a 404 if the request is for a directory /// */
	if info.IsDir() {
		http.NotFound(w, r)
		return
	}

	tmpl, err := template.ParseFiles(lp, fp)
	if err != nil {
		/* Log the detailed error /// */
		log.Print(err.Error())
		/* Return a generic "Internal Server Error" message /// */
		http.Error(w, http.StatusText(500), 500)
		return
	}

	err = tmpl.ExecuteTemplate(w, "layout", nil)
	if err != nil {
		log.Print(err.Error())
		http.Error(w, http.StatusText(500), 500)
	}
}

func contentTemplateu(w http.ResponseWriter, r *http.Request) {
	u := r.URL.Path
	responseMessages := map[string]string{
		"/work/tangent": "Hello from Go Server!",
		"/work/tangram": "Hi there, welcome to the Go Server!",
	}

	message, exists := responseMessages[u]
	if !exists {
		http.Error(w, "Not Found", http.StatusNotFound)
		return
	}

	response := Response{Message: message}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(response)
}
