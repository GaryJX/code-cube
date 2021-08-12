package config

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

type EnvVar struct {
	ClientUrl string
}

var Env EnvVar

func SetupConfig() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	Env.ClientUrl = os.Getenv("CLIENT_URL")
}
