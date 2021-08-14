package middleware

import (
	"log"
	"strings"

	"github.com/GaryJX/code-cube/pkg/models/session"
	"github.com/GaryJX/code-cube/pkg/router/handler"
	"github.com/gofiber/fiber/v2"
)

func Auth(c *fiber.Ctx) error {
	authToken := string(c.Request().Header.Peek("Authorization"))
	splitToken := strings.Split(authToken, "Bearer ")

	if len(splitToken) != 2 {
		return handler.SendError(c, 401, "Missing Bearer Authorization token")
	}

	accessToken := splitToken[1]

	log.Println(accessToken)

	s, err := session.GetSession(accessToken)
	if err != nil {
		return handler.SendError(c, 401, "Session not found, please log in")
	}
	// TODO: Get UserToken from DB and add it to Locals

	log.Println(s)

	c.Locals("userID", "TODO")
	return c.Next()
}
