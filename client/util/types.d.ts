import { Db, MongoClient } from 'mongodb'

interface CachedMongo {
  client: MongoClient
  db: Db
}

declare global {
  namespace NodeJS {
    interface Global {
      mongo: {
        conn: CachedMongo | null
        promise: Promise<CachedMongo> | null
      }
    }
  }
}
