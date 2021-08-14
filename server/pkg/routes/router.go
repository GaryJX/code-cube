package routes

import (
	"log"
	"strings"

	"github.com/GaryJX/code-cube/pkg/config"
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
	// TODO
	router.Get("/api", func(c *fiber.Ctx) error {
		return c.JSON(fiber.Map{
			"message": "Successfully reached API endpoint",
		})
	})

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

	router.Get("/api/cubes", getCubes)
}

// func respondWithJSON(w http.ResponseWriter, code int, payload interface{}) {
// 	response, _ := json.MarshalIndent(payload, "", "  ")

// 	w.Header().Set("Content-Type", "application/json")
// 	w.WriteHeader(code)
// 	w.Write(response)
// }

// func respondWithError(w http.ResponseWriter, code int, message string) {
// 	respondWithJSON(w, code, map[string]string{"error": message})
// }
