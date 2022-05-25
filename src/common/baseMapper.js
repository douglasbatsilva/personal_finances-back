const ManageDB = require("../infra/mongo");
const manageDB = new ManageDB();

class BaseMapper {
  constructor(collectionName) {
    this.collection = this.getCollection(collectionName);
  }

  getCollection(collectionName) {
    return "finance";
    // return manageDB.getDb(collectionName);
  }

  async insert(body) {
    return this.collection.insertOne(body);
  }

  async find(body) {
    return this.collection.find(body).toArray();
  }

  async delete(body) {
    return this.collection.deleteOne(body);
  }
}

module.exports = BaseMapper;
