const { MongoClient } = require("mongodb");

let client;

module.exports = async () => {
  if (client == null) {
    client = new MongoClient(process.env.MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await client.connect();

    if (process.env.NODE_ENV !== "test") {
      console.log("Database connection established");
    }
  }
  return client;
};
