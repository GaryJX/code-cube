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

var collection = "cubes"

// Get all cubes where for the specified creatorID
func GetCubes(creatorID primitive.ObjectID) ([]Cube, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	cursor, err := database.DB.Collection(collection).Find(ctx, bson.M{
		"creatorID": creatorID,
	})

	if err != nil {
		return []Cube{}, err
	}

	var cubes []Cube
	err = cursor.All(ctx, &cubes)
	return cubes, err
}

func GetCube(cubeID primitive.ObjectID) (Cube, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	cube := Cube{}
	err := database.DB.Collection(collection).FindOne(ctx, bson.M{
		"_id": cubeID,
	}).Decode(&cube)

	return cube, err
}

func (cube *Cube) CreateCube() (*mongo.InsertOneResult, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	result, err := database.DB.Collection(collection).InsertOne(ctx, cube)
	return result, err
}

func (cube *Cube) UpdateCube() (*mongo.UpdateResult, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	result, err := database.DB.Collection(collection).UpdateOne(
		ctx,
		bson.M{"_id": cube.ID},
		bson.D{
			{"$set", bson.D{
				{"updated", primitive.NewDateTimeFromTime(time.Now())},
				{"name", cube.Name},
				{"html", cube.Html},
				{"css", cube.Css},
				{"js", cube.Js},
				{"packages", cube.Packages},
			}},
		},
	)
	return result, err
}

// func (cube *Cube) DeleteCube() (*mongo.InsertOneResult, error) {
// 	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
// 	defer cancel()

// 	// TODO: Implement Delete functionality
// 	// result, err := database.DB.Collection(collection).InsertOne(ctx, cube)
// 	// return result, err
// 	return nil, nil
// }
