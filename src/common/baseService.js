let Ajv = require("ajv");
let addFormats = require("ajv-formats");
let ajv = new Ajv();
addFormats(ajv);

class baseService {
  validate(schema, body){
    const validate = ajv.compile(schema);
    const valid = validate(body);
    if (!valid) {
      return(validate.errors);
    }
    return valid;
  }
}

module.exports = baseService;