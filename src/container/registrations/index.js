const registerServices = require("./services");
const registerDatabase = require("./database");
const registerDependencies = require("./dependencies");

module.exports = {
  registerDependencies,
  registerDatabase,
  registerServices,
};
