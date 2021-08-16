package handler

import (
	"log"
	"time"

	"github.com/GaryJX/code-cube/pkg/models/cube"
	"github.com/GaryJX/code-cube/pkg/router/middleware"
	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

// GET /api/cubes
func GetCubes(c *fiber.Ctx) error {
	cubes, err := cube.GetCubes(middleware.GetUserID(c))

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

	if newCube.Name == "" {
		return sendError(c, 400, "Name cannot be empty")
	}

	createdTime := time.Now()
	newCube.ID = primitive.NilObjectID
	newCube.CreatorID = middleware.GetUserID(c)
	newCube.Created = primitive.NewDateTimeFromTime(createdTime)
	newCube.Updated = primitive.NewDateTimeFromTime(createdTime)

	result, err := newCube.CreateCube()
	if err != nil {
		return sendError(c, 500, err.Error())
	}

	return c.JSON(result)
}

// GET /api/cube/:id
func GetCube(c *fiber.Ctx) error {
	cubeID, err := primitive.ObjectIDFromHex(c.Params("id"))
	if err != nil {
		log.Println(err)
		// Not a valid ID format, so return 404 error message
		return sendError(c, 404, "Cube not found")
	}

	foundCube, err := cube.GetCube(cubeID)
	if err != nil {
		if err.Error() == "mongo: no documents in result" {
			return sendError(c, 404, "Cube not found")
		} else {
			return sendError(c, 500, err.Error())
		}
	}

	if foundCube.CreatorID != middleware.GetUserID(c) {
		return sendError(c, 403, "You do not have permission to access this cube")
	}

	return c.JSON(foundCube)
}

// PUT /api/cube/:id
func UpdateCube(c *fiber.Ctx) error {
	cubeID, err := primitive.ObjectIDFromHex(c.Params("id"))
	if err != nil {
		log.Println(err)
		// Not a valid ID format, so return 404 error message
		return sendError(c, 404, "Cube not found")
	}

	foundCube, err := cube.GetCube(cubeID)
	if err != nil {
		if err.Error() == "mongo: no documents in result" {
			return sendError(c, 404, "Cube not found")
		} else {
			return sendError(c, 500, err.Error())
		}
	}

	if foundCube.CreatorID != middleware.GetUserID(c) {
		return sendError(c, 403, "You do not have permission to access this cube")
	}

	if err := c.BodyParser(&foundCube); err != nil {
		return sendError(c, 500, err.Error())
	}

	// TODO: Update Cube here
	_, err = foundCube.UpdateCube()
	if err != nil {
		return sendError(c, 500, err.Error())
	}

	return c.JSON(fiber.Map{
		"message": "Successfully updated cube",
	})
}

// DELETE /api/cube/:id
func DeleteCube(c *fiber.Ctx) error {
	return c.JSON(fiber.Map{
		"message": "TODO",
	})
}
