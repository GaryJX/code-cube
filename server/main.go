package main

import (
	"context"
	"log"

	"github.com/GaryJX/code-cube/pkg/config"
	"github.com/GaryJX/code-cube/pkg/database"
	"github.com/GaryJX/code-cube/pkg/router"
)

func main() {
	config.SetupConfig()
	log.Println("@@@")
	log.Println(config.Env.DatabaseURI)
	log.Println(config.Env.DatabaseName)
	database.InitializeDB(config.Env.DatabaseURI, config.Env.DatabaseName)
	defer database.DB.Client().Disconnect(context.Background())

	port := config.Env.Port
	// Default port in development
	if port == "" {
		port = "8080"
	}

	router := router.NewRouter()
	router.Run(port)
}
