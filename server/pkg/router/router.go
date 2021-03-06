package router

import (
	"log"
	"strings"

	"github.com/GaryJX/code-cube/pkg/config"
	"github.com/GaryJX/code-cube/pkg/router/handler"
	"github.com/GaryJX/code-cube/pkg/router/middleware"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

type Router struct {
	*fiber.App
}

func NewRouter() *Router {
	router := Router{fiber.New()}
	router.Use(cors.New(cors.Config{
		AllowOrigins: config.Env.ClientURL,
	}))
	router.setupRoutes()
	return &router
}

func (router *Router) Run(port string) {
	log.Println("Running server on port", port)
	log.Fatal(router.Listen(":" + port))
}

func (router *Router) setupRoutes() {
	router.Get("/health", func(c *fiber.Ctx) error {
		return c.JSON(fiber.Map{
			"message": "Server is up and running!",
		})
	})

	router.Get("/test", func(c *fiber.Ctx) error {

		authToken := string(c.Request().Header.Peek("Authorization"))
		splitToken := strings.Split(authToken, "Bearer ")

		// TODO: Move the logic for checking for Bearer auth token to a middleware
		if len(splitToken) != 2 {
			return c.Status(400).JSON(fiber.Map{
				"message": "Incorrect authorization format",
			})
		}

		return c.JSON(fiber.Map{
			"message":    "Test Endpoint",
			"authToken":  authToken,
			"splitToken": splitToken[1],
		})
	})

	// TODO: Look into using middleware for auth (using Bearer token for Session token)
	api := router.Group("/api", middleware.Auth)

	// TODO: Delete this test endpoint later
	api.Get("/", func(c *fiber.Ctx) error {
		return c.JSON(fiber.Map{
			"message": "Successfully reached API endpoint",
		})
	})

	api.Get("/cubes", handler.GetCubes)
	api.Post("/cube", handler.CreateCube)
	api.Get("/cube/:id", handler.GetCube)
	api.Put("/cube/:id", handler.UpdateCube)
	api.Delete("/cube/:id", handler.DeleteCube)
}
