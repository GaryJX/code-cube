package main

import (
	"context"
	"os"

	"github.com/GaryJX/code-cube/pkg/config"
	"github.com/GaryJX/code-cube/pkg/database"
	"github.com/GaryJX/code-cube/pkg/routes"
)

func main() {
	config.SetupConfig()
	// TODO: Use Env Variables for these parameters
	database.InitializeDB("mongodb://localhost:27017", "codeCube")
	defer database.DB.Client().Disconnect(context.Background())

	port := os.Getenv("PORT")
	// Default port in development
	if port == "" {
		port = "8080"
	}

	router := routes.NewRouter()
	router.Run(port)
}
