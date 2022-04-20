const service = require("./user-service");
const baseRoute = require("../common/baseRoute");

function UserRoute(app) {
  app.routes
    .get("/register", async (req, res) => {
      const notify = { notify: req.flash("notify") };
      const render = { page: "register.ejs", notify };
      baseRoute.renderByEnv(res, render, 200);
    })

    .post("/signup", async (req, res) => {
      const result = await service.signup(req.body);
      if (result.status === 200) {
        return baseRoute.redirectByEnv(res, result, "/");
      }
      req.flash("notify", result.message);
      await baseRoute.redirectByEnv(res, result, "/register");
    })

    .get("/login", async (req, res) => {
      const notify = { notify: req.flash("notify") };
      const render = { page: "login.ejs", notify };
      await baseRoute.renderByEnv(res, render, 200);
    })

    .post("/signin", async (req, res) => {
      const result = await service.login(req.body);
      if (result.status === 200) {
        return baseRoute.redirectByEnv(res, result, "/");
      }
      req.flash("notify", result.message);
      await baseRoute.redirectByEnv(res, result, "/register");
    })

    .post("/delete", async (req, res) => {
      const body = { ...req.body, isAdmin: req.headers.isadmin };
      const result = await service.delete(body);
      return res.status(result.status).json({ message: result.message });
    });

  return app.routes;
}

module.exports = (app) => {
  return UserRoute(app);
};
