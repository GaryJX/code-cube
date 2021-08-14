package routes

import (
	"net/http"

	"github.com/GaryJX/code-cube/pkg/models"
	"github.com/gofiber/fiber/v2"
)

func getCubes(c *fiber.Ctx) error {
	cubeModel := models.Cube{}
	cubes, err := cubeModel.GetCubes("TODO: User ID")

	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(fiber.Map{
			"error": err.Error(),
		})
	}

	return c.JSON(cubes)

	// return c.JSON(fiber.Map{
	// 	"message": "Hit GetCubes Endpoint!",
	// })
}
