import {createController} from "awilix-express";
import BaseController from "../common/baseController";

class UserRoute extends BaseController {
    constructor({userService}) {
        super();
        this.userService = userService;
    }

    async signup(req, res) {
        const result = await this.userService.signup(req.body);
        return res.send(result);
    }

    async signin(req, res) {
        const result = await this.userService.login(req.body);
        return res.json(result);
    }

    async delete(req, res) {
        const body = {...req.body, isAdmin: req.headers.isadmin};
        const result = await this.userService.delete(body);
        return res.send(result);
    };
}

module.exports = createController(UserRoute)
    .prefix("user")
    .post("/signup", "signup")
    .post("/signin", "signin")
    .post("/delete", "delete")
