"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addUser = exports.login = exports.allUsers = void 0;
const users_1 = __importDefault(require("../models/users"));
const bcrypt = require('bcrypt');
exports.allUsers = (req, res) => {
    const users = users_1.default.find((err, users) => {
        if (err) {
            res.send(err);
        }
        else {
            res.send(users);
        }
    });
};
exports.login = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    if (!password || !username) {
        res.boom.badRequest("Username and password requied");
    }
    users_1.default.findOne({ "username": req.body.username }, (err, user) => {
        if (err) {
            res.send(err);
        }
        else {
            if (user == null)
                res.boom.notFound("Kindly register with us to login");
            const isAuthenticated = bcrypt.compareSync(password, user.password);
            if (!isAuthenticated) {
                res.boom.unauthorized("Invalid credentials");
            }
            else {
                res.status(200).send({ "statusCode": 200, "user": user.username });
            }
        }
    });
};
exports.addUser = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    if (!password || !username) {
        res.boom.badRequest("Username and password requied");
    }
    users_1.default.findOne({ "username": req.body.username }, (err, users) => {
        if (err) {
            res.send(err);
        }
        else {
            if (!users) {
                const user = new users_1.default(req.body);
                const salt = bcrypt.genSaltSync(10);
                const passwordHash = bcrypt.hashSync(req.body.password, salt);
                user.password = passwordHash;
                user.save((err) => {
                    if (err) {
                        res.send(err);
                    }
                    else {
                        res.status(200).send({ "statusCode": 200, "user": user });
                    }
                });
            }
            else {
                res.boom.conflict("User Already existes");
            }
        }
    });
};
//# sourceMappingURL=users_controller.js.map