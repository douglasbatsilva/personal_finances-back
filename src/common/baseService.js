const Ajv = require("ajv");
const addFormats = require("ajv-formats");

const ajv = new Ajv();
addFormats(ajv);

class BaseService {
  constructor(opts) {
    this.scope = opts.scope;
    this.nanoid = opts.nanoid;
    this.getHash = opts.getHash;
    this.repository = null;

    const repositoryName = `${this.constructor.name
      .toLowerCase()
      .replace("service", "Mapper")}`;

    if (this.scope.hasRegistration(`${repositoryName}`)) {
      this.repository = this.scope.resolve(`${repositoryName}`);
    }
  }

  validate(schema, body) {
    const validate = ajv.compile(schema);
    const valid = validate(body);
    if (!valid) {
      return validate.errors;
    }
    return valid;
  }
}

module.exports = BaseService;
