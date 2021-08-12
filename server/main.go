package main

import (
	"log"
	"os"
	"strings"

	"github.com/GaryJX/code-cube/pkg/config"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func main() {
	config.SetupConfig()
	log.Println(config.Env.ClientUrl)

	app := fiber.New()

	// TODO: Change cors config later, currently it allows all origins
	app.Use(cors.New(cors.Config{
		AllowOrigins: config.Env.ClientUrl,
	}))

	app.Get("/api", func(c *fiber.Ctx) error {
		return c.JSON(fiber.Map{
			"message": "Successfully reached API endpoint",
		})
	})

	app.Get("/health", func(c *fiber.Ctx) error {
		return c.JSON(fiber.Map{
			"message": "Server is up and running!",
		})
	})

	app.Get("/test", func(c *fiber.Ctx) error {

		authToken := string(c.Request().Header.Peek("Authorization"))
		splitToken := strings.Split(authToken, "Bearer ")

		// TODO: Move the logic for checking for Bearer auth token to a middleware
		if len(splitToken) != 2 {
			return c.Status(400).JSON(fiber.Map{
				"message": "Incorrect authorization format",
			})
		}

		return c.JSON(fiber.Map{
			"message":    "Test Endpoint",
			"authToken":  authToken,
			"splitToken": splitToken[1],
		})
	})

	port := os.Getenv("PORT")
	// Default port in development
	if port == "" {
		port = "8080"
	}

	app.Listen(":" + port)
}
