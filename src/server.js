const express = require("express");
const ManageDB = require("./infra/mongo");
const { Router } = require("express");
const session = require("express-session");
const flash = require("connect-flash");
const cookieParser = require("cookie-parser");

class Server {
  constructor() {
    this.app = express();
    this.middlewares();
    this.databaseAndStart();
    this.routes();
  }

  async middlewares() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());

    this.app.use(cookieParser("SecretStringForCookies"));
    this.app.use(
      session({
        secret: "SecretStringForCookies",
        cookie: { maxAge: 60000 },
        resave: false,
        saveUninitialized: false,
      })
    );
    this.app.use(flash());

    this.app.set("view engine", "ejs");
    this.app.use(express.static("public"));
  }

  async databaseAndStart() {
    await ManageDB.connect(process.env.DB_NAME);
    this.app.listen(3000, () => {
      console.log("Server started on port 3000");
    });
  }

  routes() {
    this.app.routes = new Router();
    this.app.use("/", require("./home/home-route")(this.app));
    this.app.use("/", require("./user/user-route")(this.app));
  }
}

module.exports = new Server().app;
