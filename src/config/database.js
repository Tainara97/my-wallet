import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const mongoURL = process.env.DATABASE_URL;
const mongoClient = new MongoClient(mongoURL);

try {
    await mongoClient.connect()
} catch (error) {
    console.log(error.message)
}

export const db = mongoClient.db()