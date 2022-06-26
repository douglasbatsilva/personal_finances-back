require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { createContainer } = require("awilix");
const { loadControllers, scopePerRequest } = require("awilix-express");
const loadContainer = require("./container");

class Server {
  constructor() {
    this.app = express();
    this.container = createContainer();
    this.middlewares();
    this.routes();
    this.start();
  }

  async middlewares() {
    loadContainer(this.container);
    this.app.use(scopePerRequest(this.container));
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(
      cors({
        origin: "*",
        methods: "*",
      })
    );
  }

  routes() {
    this.app.use(loadControllers("./**/*.route.js", { cwd: __dirname }));
  }

  start() {
    if (process.env.NODE_ENV !== "test") {
      this.app.listen(3001, async () => {
        console.log("Server started on port 3001");
      });
    }
  }
}

module.exports = new Server().app;
