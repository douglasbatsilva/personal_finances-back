const {
  registerServices,
} = require("./registrations");

module.exports = async function loadContainer(container) {
  registerServices(container);

  return container;
};
