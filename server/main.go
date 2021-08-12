package main

import (
	"log"
	"os"

	"github.com/GaryJX/code-cube/pkg/config"
	"github.com/GaryJX/code-cube/pkg/routes"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func main() {
	config.SetupConfig()
	log.Println(config.Env.ClientUrl)

	app := fiber.New()

	app.Use(cors.New(cors.Config{
		AllowOrigins: config.Env.ClientUrl,
	}))

	routes.SetupRoutes(app)

	port := os.Getenv("PORT")
	// Default port in development
	if port == "" {
		port = "8080"
	}

	app.Listen(":" + port)
}
