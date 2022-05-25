const userRegisterSchema = {
  type: "object",
  properties: {
    email: { type: "string", format: "email", minLength: 6, maxLength: 50 },
    userName: { type: "string", minLength: 6, maxLength: 15 },
    password: { type: "string", minLength: 6 },
    rePassword: { type: "string", minLength: 6 },
  },
  additionalProperties: false,
  required: ["email", "userName", "password", "rePassword"],
};

const userLoginSchema = {
  type: "object",
  properties: {
    user: { type: "string", minLength: 6, maxLength: 50 },
    password: { type: "string", minLength: 6 },
  },
  additionalProperties: false,
  required: ["user", "password"],
};

module.exports = {
  userRegisterSchema,
  userLoginSchema,
};
