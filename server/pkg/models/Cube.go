package models

import (
	"context"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

type Cube struct {
}

func (c *Cube) GetCubes(db *mongo.Database, userId string) ([]Cube, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	// TODO: Use the userId when filtering for cubes
	cursor, err := db.Collection("cubes").Find(ctx, bson.M{})
	if err != nil {
		return []Cube{}, err
	}

	var cubes []Cube

	err = cursor.All(ctx, &cubes)
	return cubes, err
}
