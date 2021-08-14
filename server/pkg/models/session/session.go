package session

import (
	"context"
	"time"

	"github.com/GaryJX/code-cube/pkg/database"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Session struct {
	ID           primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	UserID       primitive.ObjectID `json:"userId,omitempty" bson:"userId,omitempty"`
	Expires      primitive.DateTime `json:"expires,omitempty" bson:"expires,omitempty"`
	SessionToken string             `json:"sessionToken,omitempty" bson:"sessionToken,omitempty"`
	AccessToken  string             `json:"accessToken,omitempty" bson:"accessToken,omitempty"`
	CreatedAt    primitive.DateTime `json:"createdAt,omitempty" bson:"createdAt,omitempty"`
	UpdatedAt    primitive.DateTime `json:"updatedAt,omitempty" bson:"updatedAt,omitempty"`
}

var collection = "sessions"

func GetSession(accessToken string) (Session, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	var session Session
	err := database.DB.Collection(collection).FindOne(ctx, bson.M{"accessToken": accessToken}).Decode(&session)

	return session, err
}
