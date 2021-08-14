package handler

import (
	"time"

	"github.com/GaryJX/code-cube/pkg/models/cube"
	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

// GET /api/cubes
func GetCubes(c *fiber.Ctx) error {
	cubes, err := cube.GetCubes(c.Locals("userID").(primitive.ObjectID))

	if err != nil {
		return SendError(c, 500, err.Error())
	}

	return c.JSON(cubes)
}

// POST /api/cube
func CreateCube(c *fiber.Ctx) error {
	newCube := cube.Cube{}

	if err := c.BodyParser(&newCube); err != nil {
		return SendError(c, 500, err.Error())
	}

	if newCube.Name == "" {
		return SendError(c, 400, "Name cannot be empty")
	}

	createdTime := time.Now()
	newCube.ID = primitive.NilObjectID
	newCube.CreatorID = c.Locals("userID").(primitive.ObjectID)
	newCube.Created = primitive.NewDateTimeFromTime(createdTime)
	newCube.Updated = primitive.NewDateTimeFromTime(createdTime)

	result, err := newCube.CreateCube()
	if err != nil {
		return SendError(c, 500, err.Error())
	}

	return c.JSON(result)
}
