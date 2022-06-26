const {
  registerDatabase,
  registerServices,
  registerDependencies,
} = require("./registrations");

module.exports = async function loadContainer(container, config) {
  registerDatabase(container, config);
  registerDependencies(container);
  registerServices(container);

  return container;
};
