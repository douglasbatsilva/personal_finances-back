
const dbo = require("../../infra/mongo");

class HomeMapper{
  async insert(body){
    const db = dbo.getDb();
    const teste = await db.collection("users").insertOne(body);
    return teste;
  }

  async find(body) {
    const db = dbo.getDb();
    return db.collection("contacts").find(body).toArray();
  }
  
  async findAll() {
    const db = dbo.getDb();
    return db.collection("contacts").find({}).toArray();
  }
}

module.exports = new HomeMapper();