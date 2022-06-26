const { asValue, Lifetime } = require("awilix");
const mongoConnection = require("../../infra/mongo");
const SINGLETON = { lifetime: Lifetime.SINGLETON };

const registerDatabase = (container) => {
  container.register(
    "mongoConnection",
    asValue(mongoConnection(process.env.DB_NAME), SINGLETON)
  );

  mongoConnection().then((cnn) => {
    container.register("db", asValue(cnn.db(process.env.DB_NAME), SINGLETON));
  });
  container.register("mapperOptions", asValue({}));
};

module.exports = registerDatabase;