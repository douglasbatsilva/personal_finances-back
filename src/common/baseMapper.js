class BaseMapper {
  constructor(opts, modelName) {
    const { db } = opts;
    this.collection = db.collection(modelName);
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
