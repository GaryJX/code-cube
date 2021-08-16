package middleware

import (
	"log"
	"strings"

	"github.com/GaryJX/code-cube/pkg/models/session"
	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

// Key for c.Locals to store User ID
const userIDKey = "userID"

func Auth(c *fiber.Ctx) error {
	authToken := string(c.Request().Header.Peek("Authorization"))
	splitToken := strings.Split(authToken, "Bearer ")
	if len(splitToken) != 2 {
		return sendError(c, 401, "Missing Bearer Authorization token")
	}
	// Extract access token from Bearer Authorization token
	accessToken := splitToken[1]

	userSession, err := session.GetSession(accessToken)
	if err != nil {
		log.Println(err)
		return sendError(c, 401, "Session not found, please log in")
	}

	c.Locals(userIDKey, userSession.UserID)
	return c.Next()
}

func GetUserID(c *fiber.Ctx) primitive.ObjectID {
	return c.Locals(userIDKey).(primitive.ObjectID)
}

// Helper function for sending back error responses (// TODO: Move to its own utils/helpers package)
func sendError(c *fiber.Ctx, status int, err string) error {
	return c.Status(status).JSON(fiber.Map{
		"error": err,
	})
}
