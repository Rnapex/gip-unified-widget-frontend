import dotenv from "dotenv";

dotenv.config();

import { MongoClient }
  from "mongodb";

const mongoUri =
  process.env.MONGO_URI;

if (!mongoUri) {
  throw new Error(
    "MONGO_URI missing in .env"
  );
}

const client =
  new MongoClient(mongoUri);

let db;

export async function connectMongo() {
  await client.connect();

  db =
    client.db("getitpicked_db");

  console.log(
    "Mongo Connected"
  );
}

export function getDB() {
  return db;
}