const { asValue, Lifetime } = require("awilix");
const formatName = require("../dependency-formatter");

const registerServices = (container) => {
  console.log("\n", "Registering Services & Requests...", "\n");
  container.loadModules(
    [
      [
        "../../**/*.request.js",
        {
          register: asValue,
          lifetime: Lifetime.SINGLETON,
        },
      ],
      "../../**/!(base*)*.service.js",
    ],
    {
      cwd: __dirname,
      formatName,
    }
  );
  console.log("\n");
};

module.exports = registerServices;
