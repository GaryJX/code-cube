package routes

import (
	"github.com/GaryJX/code-cube/pkg/models"
	"github.com/gofiber/fiber/v2"
)

func getCubes(c *fiber.Ctx) error {
	cubeModel := models.Cube{}
	cubes, err := cubeModel.GetCubes()

	return c.JSON(fiber.Map{
		"message": "Hit GetCubes Endpoint!",
	})
}
