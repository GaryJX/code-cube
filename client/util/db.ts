import { Db, MongoClient, ObjectId } from 'mongodb'
import Config from '@/config/config'

const MONGODB_URI = Config.mongodbURI
const MONGODB_DB = Config.mongodbDatabase

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  )
}

if (!MONGODB_DB) {
  throw new Error(
    'Please define the MONGODB_DB environment variable inside .env.local'
  )
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongo

if (!cached) {
  cached = global.mongo = { conn: null, promise: null }
}

export async function connectToDatabase(): Promise<{ db: Db }> {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }

    cached.promise = MongoClient.connect(MONGODB_URI, opts).then((client) => {
      return {
        client,
        db: client.db(MONGODB_DB),
      }
    })
  }
  cached.conn = await cached.promise
  return cached.conn
}

interface CodeBlock {
  _id: ObjectId
  creatorId: ObjectId
  created: Date
  updated: Date
  name: string
  // TODO: These might not be strings, depending on if I will use Quill
  html: string
  css: string
  js: string
}

// db.codeBlocks.insertOne({
//   creatorId: ObjectId('60f8d304281ef1033030530a'),
//   created: new Date(),
//   updated: new Date(),
//   name: 'Test Title 2',
//   html: '<h1>Hello 2</h1>',
//   css: 'body { background-color: grey; }',
//   js: "document.querySelector('h1').textContent = 'Hijacked by JS 2'",
// })
