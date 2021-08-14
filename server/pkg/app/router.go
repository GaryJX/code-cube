package app

import "github.com/gofiber/fiber/v2"

type Router struct {
	*fiber.App
}

func (app *App) newRouter() {
	app.Router = router
}
