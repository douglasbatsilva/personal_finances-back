const { createController } = require("awilix-express");
const BaseController = require("../common/baseController");

class Finance extends BaseController {
  async post(req, res) {
    const result = await this.service.register(req.body);
    return res.send(result);
  }
}

module.exports = createController(Finance)
  .prefix("/finance")
  .post("/register", "post");

