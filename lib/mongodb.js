import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

export default async function connectToDatabase() {
  const client = await MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = await client.db("DFeedSite");

  return { client, db };
}
