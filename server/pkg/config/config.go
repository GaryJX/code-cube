package config

import (
	"os"

	"github.com/joho/godotenv"
)

type EnvVar struct {
	ClientUrl string
}

var Env EnvVar

func SetupConfig() {
	godotenv.Load()

	Env.ClientUrl = os.Getenv("CLIENT_URL")
}
