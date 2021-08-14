package routes

import "github.com/gofiber/fiber/v2"

func GetCubes(c *fiber.Ctx) error {
	return c.JSON(fiber.Map{
		"message": "Hit GetCubes Endpoint!",
	})
}
