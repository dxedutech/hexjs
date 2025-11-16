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

	// go func() {
	// 	client = initMongoDB()
	// }()
	// 반드시 동기로 초기화
	client = initMongoDB()


	// origin := http.StripPrefix("/www/", http.FileServer(http.Dir("./www")))
	// wrapped := http.HandlerFunc(func(writer http.ResponseWriter, req *http.Request) {
	// 	writer.Header().Set("Access-Control-Allow-Origin", "*")
	// 	writer.Header().Set("Access-Control-Allow-Methods", "POST, GET")
	// 	writer.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
	// 	origin.ServeHTTP(writer, req)
	// })
	// CORS 미들웨어
	cors := func(h http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			w.Header().Set("Access-Control-Allow-Origin", "*")
			w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
			w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
			if r.Method == "OPTIONS" {
				w.WriteHeader(200)
				return
			}
			h.ServeHTTP(w, r)
		})
	}

	http.HandleFunc("/apisignup", signupHandler)
  http.HandleFunc("/apilogin", loginHandler)

	// http.Handle("/www/", wrapped)
	// http.HandleFunc("/work/", contentTemplateu) // Register a single handler to handle all routes
	// http.HandleFunc("/", serveTemplateu)

	static := http.StripPrefix("/www/", http.FileServer(http.Dir("./www")))
	http.Handle("/www/", cors(static))
	http.Handle("/work/", cors(http.HandlerFunc(contentTemplateu)))
	http.Handle("/", cors(http.HandlerFunc(serveTemplateu)))

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

