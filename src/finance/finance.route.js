const service = require("./finance.service");
const {Router} = require("express");

const router = new Router();

function FinanceRoute() {
  router
    .post("/register", async (req, res) => {
      const result = await service.signup(req.body);
      return res.send(result);
    })

  return router;
}

module.exports = FinanceRoute;
