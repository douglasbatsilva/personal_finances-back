const ManageDB = require("../infra/mongo");

class BaseMapper {
  constructor(collectionName) {
    this.collection = this.getCollection(collectionName);
  }

  getCollection(collectionName) {
    return ManageDB.getDb(collectionName);
  }

  async insert(body){
    return this.collection.insertOne(body);
  }

  async find(body){
    return this.collection.find(body).toArray();
  }

  async delete(body){
    return this.collection.deleteOne(body);
  }
}

module.exports = BaseMapper;