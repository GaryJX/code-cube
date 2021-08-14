package handler

import (
	"github.com/GaryJX/code-cube/pkg/models/cube"
	"github.com/gofiber/fiber/v2"
)

// GET /api/cubes
func GetCubes(c *fiber.Ctx) error {
	cubes, err := cube.GetCubes("TODO: User ID")

	if err != nil {
		return sendError(c, 500, err.Error())
	}

	return c.JSON(cubes)
}

// POST /api/cube
func CreateCube(c *fiber.Ctx) error {
	newCube := cube.Cube{}

	if err := c.BodyParser(&newCube); err != nil {
		return sendError(c, 500, err.Error())
	}

	result, err := newCube.CreateCube()
	if err != nil {
		return sendError(c, 500, err.Error())
	}

	return c.JSON(result)
}
