const BaseService = require("../common/baseService");
const UserMapper = require("./repository/finance.mapper");
const { userRegisterSchema, userLoginSchema } = require("./finance.request");

class FinanceService extends BaseService {
  async register(bodyParam) {
    const body = bodyParam;
    const result = await this.validateRegistrationData(body);
    if (result.isValid) {
      body._id = this.nanoid(15);
      body.password = this.getHash(body.password);
      delete body.rePassword;

      await UserMapper.insert(body);
      return {
        message: "User created successfully",
        status: 200,
      };
    }

    return { ...result, status: 400 };
  }
}

module.exports = FinanceService;
