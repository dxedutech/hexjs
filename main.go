package main

import (
	"encoding/json"
	"fmt"
	"html/template"
	"log"
	"net/http"
	"os"
	"path/filepath"
	s "strings"
)

var printu = fmt.Println

func ternaryu[T any](i int, req, res T) T {
	if i == 0 {
		return res
	}
	return req
}

func serveTemplateu(w http.ResponseWriter, r *http.Request) {
	lp := filepath.Join("www/ware", "layout.html")
	u := ternaryu(s.Compare(r.URL.Path, "/"), r.URL.Path, "index")
	fp := filepath.Join("www/want", filepath.Clean(u))
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

type Response struct {
	Message string `json:"message"`
}

func contentTemplateu(w http.ResponseWriter, r *http.Request) {
	u := r.URL.Path
	responseMessages := map[string]string{
		"/want/tangent": "Hello from Go Server!",
		"/want/tangram": "Hi there, welcome to the Go Server!",
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

func main() {
	origin := http.StripPrefix("/www/", http.FileServer(http.Dir("./www")))
	wrapped := http.HandlerFunc(func(writer http.ResponseWriter, req *http.Request) {
		writer.Header().Set("Access-Control-Allow-Origin", "*")
		writer.Header().Set("Access-Control-Allow-Methods", "POST, GET")
		writer.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
		origin.ServeHTTP(writer, req)
	})
	http.Handle("/www/", wrapped)
	http.HandleFunc("/want/", contentTemplateu) // Register a single handler to handle all routes
	http.HandleFunc("/", serveTemplateu)

	printu("Listening on :8080...")
	err := http.ListenAndServe(":8080", nil)
	if err != nil {
		log.Fatal(err)
	}
}
