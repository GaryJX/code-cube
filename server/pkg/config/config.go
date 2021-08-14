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
		ClientURL: os.Getenv("CLIENT_URL"),
		// TODO: Use Env Variables for these parameters
		DatabaseURI:  "mongodb://localhost:27017",
		DatabaseName: "codeCube",
		Port:         os.Getenv("PORT"),
	}
}
