const { createController } = require("awilix-express");
const BaseController = require("../common/baseController");

class User extends BaseController {
  async signup(req, res) {
    const result = await this.service.signup(req.body);
    return res.send(result);
  }

  async signin(req, res) {
    const result = await this.service.login(req.body);
    return res.json(result);
  }

  async delete(req, res) {
    const body = { ...req.body, isAdmin: req.headers.isadmin };
    const result = await this.service.delete(body);
    return res.send(result);
  }
}

module.exports = createController(User)
  .prefix("/user")
  .post("/signup", "signup")
  .post("/signin", "signin")
  .post("/delete", "delete");
