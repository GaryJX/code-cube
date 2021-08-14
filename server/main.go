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
	// TODO: Use Env Variables for these parameters
	a.InitializeDB("mongodb://localhost:27017", "codeCube")
	a.Run(port)
}
