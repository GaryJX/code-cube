package app

// import (
// 	"context"
// 	"log"
// 	"time"

// 	"github.com/GaryJX/code-cube/pkg/routes"
// 	"go.mongodb.org/mongo-driver/mongo"
// 	"go.mongodb.org/mongo-driver/mongo/options"
// 	"go.mongodb.org/mongo-driver/mongo/readpref"
// )

// type App struct {
// 	Router *routes.Router
// 	DB     *mongo.Database
// }

// func (app *App) InitializeRouter() {
// 	router := routes.NewRouter()
// 	app.Router = router
// }

// func (app *App) InitializeDB(connectionURI string, dbName string) {
// 	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
// 	defer cancel()

// 	client, err := mongo.Connect(ctx, options.Client().ApplyURI(connectionURI))
// 	if err != nil {
// 		panic(err)
// 	}
// 	defer client.Disconnect(ctx)

// 	// Testing connection (// TODO: Delete later)
// 	if err = client.Ping(ctx, readpref.Primary()); err != nil {
// 		panic(err)
// 	}

// 	app.DB = client.Database(dbName)
// }

// func (app *App) Run(port string) {
// 	log.Println("Running server on port", port)
// 	log.Fatal(app.Router.Listen(":" + port))
// }
