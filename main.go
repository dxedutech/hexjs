package main

import (
	"log"
	"net/http"
	"os"
)

type Response struct {
	Message string `json:"message"`
}

func main() {

	go func() {
		client = initMongoDB()
	}()

	origin := http.StripPrefix("/www/", http.FileServer(http.Dir("./www")))
	wrapped := http.HandlerFunc(func(writer http.ResponseWriter, req *http.Request) {
		writer.Header().Set("Access-Control-Allow-Origin", "*")
		writer.Header().Set("Access-Control-Allow-Methods", "POST, GET")
		writer.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
		origin.ServeHTTP(writer, req)
	})
	http.Handle("/www/", wrapped)
	http.HandleFunc("/work/", contentTemplateu) // Register a single handler to handle all routes
	http.HandleFunc("/", serveTemplateu)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Println("Listening on :"+port)
	err := http.ListenAndServe(":"+port, nil)
	if err != nil {
		log.Fatal(err)
	}
}

