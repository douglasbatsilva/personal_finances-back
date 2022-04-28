const md5 = require("md5");
const { nanoid } = require("nanoid");
const BaseService = require("../common/baseService");
const UserMapper = require("./repository/finance-mapper");
const { userRegisterSchema, userLoginSchema } = require("./finance-request");

class FinanceService extends BaseService {
  async signup(bodyParam) {
    const body = bodyParam;
    const result = await this.validateRegistrationData(body);
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
    const response = { isValid: true };

    const valid = this.validate(userRegisterSchema, body);
    if (valid !== true) {
      return {
        message: `The field ${valid[0].instancePath} ${valid[0].message}`,
      };
    }

    if (password !== rePassword) {
      return { message: "Passwords do not match", isValid: false };
    }

    const existsLoginData = await this.searchUserByEmailOrUserName(
      email,
      userName
    );
    if (existsLoginData) {
      return { ...existsLoginData, isValid: false };
    }

    return response;
  }

  async searchUserByEmailOrUserName(email, userName) {
    const existsUserName = await UserMapper.find({ userName });
    if (existsUserName.length > 0) {
      return { message: "This user name already exists" };
    }

    const existsEmail = await UserMapper.find({ email });
    if (existsEmail.length > 0) {
      return { message: "This user email already exists" };
    }

    return false;
  }

  async login(body) {
    const result = await this.validateLoginData(body);
    if (result.isValid) {
      return { message: result.message, status: 200, id: result.id };
    }

    return { message: result.message, status: result.status || 400 };
  }

  async validateLoginData(body) {
    const valid = this.validate(userLoginSchema, body);
    if (valid !== true) {
      return {
        message: `The field ${valid[0].instancePath} ${valid[0].message}`,
      };
    }

    const userData = await this.searchUser(body);
    return userData;
  }

  async searchUser(body) {
    const { user, password } = body;

    const query = { $or: [{ email: user }, { userName: user }] };
    const existisUser = await UserMapper.find(query);
    if (existisUser.length === 0) {
      return { message: "User not found", isValid: false, status: 404 };
    }

    const passwordHash = md5(password);
    if (passwordHash !== existisUser[0].password) {
      return { message: "Password is incorrect", isValid: false };
    }

    return { message: "Login successfully", id: user[0]._id, isValid: true };
  }

  async delete(body) {
    const { deletedCount } = await UserMapper.delete(body);
    if (deletedCount === 0) {
      return { message: "User not found", status: 404 };
    }
    return { message: "User deleted successfully", status: 200 };
  }
}

module.exports = new FinanceService();
