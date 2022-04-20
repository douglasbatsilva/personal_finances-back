const baseRoute = require("../common/baseRoute");

function HomeRoute(app) {
  app.routes
    .get("/", async (req, res) => {
      await res.render("index.ejs");
    });
  return app.routes;
}

module.exports = (app) => {
  return HomeRoute(app);
};
