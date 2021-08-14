package main

import (
	"os"

	"github.com/GaryJX/code-cube/pkg/app"
	"github.com/GaryJX/code-cube/pkg/config"
	"github.com/GaryJX/code-cube/pkg/database"
)

func main() {
	config.SetupConfig()
	// TODO: Use Env Variables for these parameters
	database.InitializeDB("mongodb://localhost:27017", "codeCube")

	port := os.Getenv("PORT")
	// Default port in development
	if port == "" {
		port = "8080"
	}

	a := app.App{}
	a.InitializeRouter()
	// a.InitializeDB("mongodb://localhost:27017", "codeCube")
	a.Run(port)
}
