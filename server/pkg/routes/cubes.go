package routes

import (
	"net/http"

	"github.com/GaryJX/code-cube/pkg/models/cube"
	"github.com/gofiber/fiber/v2"
)

// GET /api/cubes
func getCubes(c *fiber.Ctx) error {
	cubes, err := cube.GetCubes("TODO: User ID")

	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(fiber.Map{
			"error": err.Error(),
		})
	}

	return c.JSON(cubes)
}

// POST /api/cube
func createCube(c *fiber.Ctx) error {
	return c.JSON(fiber.Map{})
}
