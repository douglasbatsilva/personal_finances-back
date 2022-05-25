require("dotenv").config();
const express = require("express");
const cors = require("cors");
const {createContainer} = require("awilix");
const {loadControllers, scopePerRequest} = require('awilix-express')
const ManageDB = require("./infra/mongo");
const loadContainer = require("./container");

const app = express();
// this.middlewares();

const container = createContainer()
loadContainer(container);

app.use(scopePerRequest(container));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(
    cors({
        origin: "*",
        methods: "*",
    })
);

app.use(loadControllers("./**/*.route.js", {cwd: __dirname}));

// await ManageDB.connect(process.env.DB_NAME);
app.listen(3001, () => {
    console.log("Server started on port 3001");
});
