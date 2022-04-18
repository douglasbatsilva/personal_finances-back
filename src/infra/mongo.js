const { MongoClient } = require("mongodb");
require("dotenv").config();
const DB_NAME = process.env.DB_NAME;
let client;

class ManageDB {
  static async connect() {
    client = new MongoClient(process.env.MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await client.connect();
    client.db(DB_NAME);
    console.log("Database connection established");
  }

  static getDb(collectionName) {
    const dbName = client.db(DB_NAME);
    return dbName.collection(collectionName);
  }
}

module.exports = ManageDB;