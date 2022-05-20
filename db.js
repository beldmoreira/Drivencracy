import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

export default async function connection() {

  const mongoClient = new MongoClient(process.env.MONGO_URI);
  await mongoClient.connect();
  const db = mongoClient.db(process.env.MONGO_COLLECTION);
  return { mongoClient, db };
}
