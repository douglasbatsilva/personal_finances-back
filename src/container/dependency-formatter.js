const formatName = (name) => {
  const splat = name.split(".");
  const namespace = splat[1];
  const resource = splat[0].split("-");
  let resourceName = resource.shift();

  resourceName += resource.reduce((total, part) => {
    return total + part.replace(/^./, part[0].toUpperCase());
  }, "");

  resourceName += namespace.replace(/\w/, (a) => a.toUpperCase());

  console.log(`${resourceName} successfully registered`);
  return resourceName;
};

module.exports = formatName;
