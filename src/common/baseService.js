const Ajv = require("ajv");
const addFormats = require("ajv-formats");

const ajv = new Ajv();
addFormats(ajv);

class BaseService {
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
