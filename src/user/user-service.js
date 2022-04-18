const md5 = require("md5");
const { nanoid } = require("nanoid");
const UserMapper = require("./repository/user-mapper");

let Ajv = require("ajv");
let addFormats = require("ajv-formats");
let ajv = new Ajv();
addFormats(ajv);
let userRequest = require("./user-request.json");

class UserService {
  async signup(body) {

    const validate = ajv.compile(userRequest);
    const valid = validate(body);
    console.log(validate.errors);

    let result = await this.validateRegistrationData(body);

    if (result.isValid) {
      body._id = nanoid(15);
      body.password = md5(body.password);
      delete body.rePassword;

      await UserMapper.insert(body);
      return {
        message: "User created successfully",
        status: 200,
      };
    }

    return { ...result, status: 400 };
  }

  async validateRegistrationData(body) {
    const { email, userName, password, rePassword } = body;
    let response = { isValid: true };

    if (password !== rePassword) {
      return (response = { message: "Passwords do not match", isValid: false });
    }

    const isEmpty = this.emptyField(body);
    if (isEmpty) {
      return (response = { ...isEmpty, isValid: false });
    }

    const existsLoginData = await this.searchUserByEmailOrUserName(
      email,
      userName
    );
    if (existsLoginData) {
      return (response = { ...existsLoginData, isValid: false });
    }

    return response;
  }

  emptyField(body) {
    for (const key in body) {
      if (body[key] == null || body[key].match(/^ *$/) !== null) {
        return { message: `${key} is Empty` };
      }
    }
  }

  async searchUserByEmailOrUserName(email, userName) {
    const existsUserName = await UserMapper.find({ userName });
    if (existsUserName.length > 0) {
      return { message: "User name already exists" };
    }

    const existsEmail = await UserMapper.find({ email });
    if (existsEmail.length > 0) {
      return { message: "Email already exists" };
    }

    return false;
  }

  async login(body) {
    const result = await this.validateLoginData(body);
    if (result.isValid) {
      return { message: result.message, status: 200, id: result.id };
    }

    return { message: result.message, status: 400 };
  }

  async validateLoginData(body) {
    const { email, userName, password } = body;
    if ((!email && !userName) || !password) {
      return { message: "Complete all the fields correctly", isValid: false };
    }

    const userData = await this.validateUser(body);
    return userData;
  }

  async validateUser(body) {
    const { email, userName, password } = body;

    const query = { $or: [{ email }, { userName }] };
    const user = await UserMapper.find(query);
    if (user.length === 0) {
      return { message: "User not found", isValid: false };
    }

    const passwordHash = md5(password);
    if (passwordHash !== user[0].password) {
      return { message: "Password is incorrect", isValid: false };
    }

    return { message: "Login successfully", id: user[0]._id, isValid: true };
  }

  async delete(body) {
    const result = await UserMapper.delete(body);
    return result;
    // return { message: "User deleted successfully", isValid: true, status: 200 };
  }
}

module.exports = new UserService();
