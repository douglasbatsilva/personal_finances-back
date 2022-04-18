const { nanoid } = require("nanoid");
const service = require("./home-service");

function registerRoute(app) {
  app.routes
    .get("/", async (req, res) => {
      res.render("index.ejs", { message: req.flash("notify") });
    });
  return app.routes;
}

module.exports = (app) => {
  return registerRoute(app);
};
