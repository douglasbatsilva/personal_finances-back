const express = require("express");
const { Router } = require("express");
const ManageDB = require("./infra/mongo");
const cors = require("cors");

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
    this.app.use(
      cors({
        origin: "*",
        methods: "*",
      })
    );
  }

  async databaseAndStart() {
    await ManageDB.connect(process.env.DB_NAME);
    this.app.listen(3001, () => {
      console.log("Server started on port 3001");
    });
  }

  routes() {
    this.app.routes = new Router();
    this.app.use("/", require("./user/user-route")(this.app));
    this.app.use("/finance", require("./finance/finance-route")(this.app));
  }
}

module.exports = new Server().app;
