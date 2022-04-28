const service = require("./user-service");

function UserRoute(app) {
  app.routes
    .post("/signup", async (req, res) => {
      const result = await service.signup(req.body);
      return res.send(result);
    })

    .post("/signin", async (req, res) => {
      const result = await service.login(req.body);
      return res.json(result);
    })

    .post("/delete", async (req, res) => {
      const body = { ...req.body, isAdmin: req.headers.isadmin };
      const result = await service.delete(body);
      return res.send(result);
    });

  return app.routes;
}

module.exports = (app) => {
  return UserRoute(app);
};
