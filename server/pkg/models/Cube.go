package models

import (
	"context"
	"time"

	"github.com/GaryJX/code-cube/pkg/database"
	"go.mongodb.org/mongo-driver/bson"
)

type Cube struct {
}

func (c *Cube) GetCubes(userId string) ([]Cube, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	// TODO: Use the userId when filtering for cubes
	cursor, err := database.DB.Collection("cubes").Find(ctx, bson.M{})
	if err != nil {
		return []Cube{}, err
	}

	var cubes []Cube
	err = cursor.All(ctx, &cubes)
	return cubes, err
}
