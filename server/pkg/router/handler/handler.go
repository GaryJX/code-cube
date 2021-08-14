package handler

import "github.com/gofiber/fiber/v2"

// Helper function for sending back error responses
func SendError(c *fiber.Ctx, status int, err string) error {
	return c.Status(status).JSON(fiber.Map{
		"error": err,
	})
}
