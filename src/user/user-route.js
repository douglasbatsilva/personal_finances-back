const service = require("./user-service");

function UserRoute(app) {
  app.routes
    .get("/register", async (req, res) => {
      res.render("register.ejs", { message: req.flash("notify") });
    })

    .post("/signup", async (req, res) => {
      const result = await service.signup(req.body);
      if (result.status === 200) {
        //await res.redirect("/");
        return res.status(result.status).json(result.message);
      }
      req.flash("notify", result.message);
      //await res.redirect("/register");
      return res.status(result.status).json(result.message);
    })

    .post("/login", async (req, res) => {
      const result = await service.login(req.body);
      return res.status(result.status).json({message: result.message}); // Estou passando o ID do Banco aqui
    })

    .post("/delete", async (req, res) => {
      const result = await service.delete(req.body);
      return res.status(200).json({message: "DELETADO"});
    });

  return app.routes;
}

module.exports = (app) => {
  return UserRoute(app);
};
