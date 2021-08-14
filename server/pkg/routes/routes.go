package routes

import (
	"strings"

	"github.com/gofiber/fiber/v2"
)

func SetupRoutes(app *fiber.App) {
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

	app.Get("/api/cubes", GetCubes)
}
