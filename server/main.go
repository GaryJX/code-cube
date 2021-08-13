package main

import (
	"os"

	"github.com/GaryJX/code-cube/pkg/app"
	"github.com/GaryJX/code-cube/pkg/config"
)

func main() {
	config.SetupConfig()
	// TODO: Delete this commented out code later
	// log.Println(config.Env.ClientUrl)

	port := os.Getenv("PORT")
	// Default port in development
	if port == "" {
		port = "8080"
	}

	a := app.App{}
	a.InitializeRouter()
	// TODO: Add credentials for DB connection
	a.InitializeDB()
	a.Run(port)
}
