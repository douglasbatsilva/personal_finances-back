const { asValue } = require("awilix");
const { v4: uuidv4 } = require("uuid");
const { nanoid } = require("nanoid");
const md5 = require("md5");

const registerDependencies = (container) => {
  container.register({ scope: asValue(container) });
  container.register("uuid", asValue(uuidv4));
  container.register("nanoid", asValue(nanoid));
  container.register("getHash", asValue(md5));
};

module.exports = registerDependencies;
