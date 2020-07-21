import express, { Application } from "express";
import bodyParser from "body-parser";
const boom = require('express-boom');
import connect from "./connect";
import { db } from "./config/config";
import * as UserController from "./controllers/users_controller";
import { Bootstrap } from "./bootstrap";
const cors = require("cors");
const app: Application = express();
const port: number = 5000 || process.env.PORT;

connect(db);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(boom());

app.get("/users", UserController.allUsers);

app.post("/login", UserController.login);

app.post("/signup", UserController.addUser);

app.listen(port, () => {
  console.log(`Server running on ${port}`);
  Bootstrap.initialize()
});
