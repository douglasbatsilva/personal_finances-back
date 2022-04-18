const { nanoid } = require("nanoid");
const LoginMapper = require("./repository/home-mapper");


class HomeService {
  async register(body) {
    const { email, password } = body;
    const contact = {
      _id: nanoid(15),
      email,
      password,
    };
    const result = LoginMapper.insert(contact);
    return result;
  }

  async find(body) {
    const result = await LoginMapper.find({email: body});
    return result[0];
  }

  async findAll() {
    const result = await HomeMapper.findAll();
    return result;
  }
}

module.exports = new HomeService();