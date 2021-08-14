package cube

import (
	"context"
	"time"

	"github.com/GaryJX/code-cube/pkg/database"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type Cube struct {
	ID        primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	CreatorID primitive.ObjectID `json:"creatorID,omitempty" bson:"creatorID,omitempty"`
	Created   primitive.DateTime `json:"created,omitempty" bson:"created,omitempty"`
	Updated   primitive.DateTime `json:"updated,omitempty" bson:"updated,omitempty"`
	Name      string             `json:"name,omitempty" bson:"name,omitempty"`
	Html      string             `json:"html,omitempty" bson:"html,omitempty"`
	Css       string             `json:"css,omitempty" bson:"css,omitempty"`
	Js        string             `json:"js,omitempty" bson:"js,omitempty"`
	Packages  []string           `json:"packages,omitempty" bson:"packages,omitempty"`
}

var collection = database.DB.Collection("cubes")

func GetCubes(userId string) ([]Cube, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	// TODO: Use the userId when filtering for cubes
	cursor, err := collection.Find(ctx, bson.M{})
	if err != nil {
		return []Cube{}, err
	}

	var cubes []Cube
	err = cursor.All(ctx, &cubes)
	return cubes, err
}

func (cube *Cube) CreateCube() (*mongo.InsertOneResult, error) {
	// TODO: Move this to the CreateCube endpoint?
	createdTime := time.Now()
	cube.ID = primitive.NilObjectID
	// cube.CreatorID = "TODO" // TODO: Include the CreatorID
	cube.Created = primitive.NewDateTimeFromTime(createdTime)
	cube.Updated = primitive.NewDateTimeFromTime(createdTime)

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	result, err := collection.InsertOne(ctx, cube)
	return result, err
}
