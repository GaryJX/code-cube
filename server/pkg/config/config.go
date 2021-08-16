package config

import (
	"os"

	"github.com/joho/godotenv"
)

type EnvVar struct {
	ClientURL    string
	DatabaseURI  string
	DatabaseName string
	Port         string
}

var Env EnvVar

func SetupConfig() {
	godotenv.Load()

	Env = EnvVar{
		ClientURL:    os.Getenv("CLIENT_URL"),
		DatabaseURI:  os.Getenv("DB_URI"),
		DatabaseName: os.Getenv("DB_NAME"),
		Port:         os.Getenv("PORT"),
	}
}
