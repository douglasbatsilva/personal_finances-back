const { MongoClient } = require("mongodb");

const { DB_NAME } = process.env;
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

  getDb(collectionName) {
    const dbName = client.db(DB_NAME);
    return dbName.collection(collectionName);
  }
}

module.exports = ManageDB;
