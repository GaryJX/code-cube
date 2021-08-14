package app

import (
	"context"
	"log"
	"time"

	"github.com/GaryJX/code-cube/pkg/config"
	"github.com/GaryJX/code-cube/pkg/routes"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type App struct {
	Router *fiber.App
	DB     *mongo.Database
}

func (app *App) InitializeRouter() {
	router := fiber.New()

	router.Use(cors.New(cors.Config{
		AllowOrigins: config.Env.ClientUrl,
	}))

	routes.SetupRoutes(router)

	app.Router = router
}

func (app *App) InitializeDB(connectionURI string, dbName string) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	client, err := mongo.Connect(ctx, options.Client().ApplyURI(connectionURI))
	if err != nil {
		panic(err)
	}
	defer client.Disconnect(ctx)

	app.DB = client.Database(dbName)
}

func (app *App) Run(port string) {
	log.Println("Running server on port", port)
	log.Fatal(app.Router.Listen(":" + port))
}
