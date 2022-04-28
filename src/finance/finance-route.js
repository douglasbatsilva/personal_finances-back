const service = require("./finance-service");

function FinanceRoute(app) {
  app.routes
  
    .post("/register", async (req, res) => {
      const result = await service.signup(req.body);
      return res.send(result);
    })

  return app.routes;
}

module.exports = (app) => {
  return FinanceRoute(app);
};
