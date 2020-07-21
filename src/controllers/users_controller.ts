import { Request, Response } from "express";
import Users from "../models/users";
const bcrypt = require('bcrypt');

export const allUsers = (req: Request, res: Response) => {
  const users = Users.find((err: any, users: any) => {
    if (err) {
      res.send(err);
    } else {
      res.send(users);
    }
  });
};

export const login = (req: Request, res: Response) => {

  const username = req.body.username;
  const password = req.body.password;

  if (!password || !username) {
    res.boom.badRequest("Username and password requied");
  }

  Users.findOne({ "username": req.body.username }, (err: any, user: any) => {
    if (err) {
      res.send(err);
    } else {
      if (user == null)
        res.boom.notFound("Kindly register with us to login");


      const isAuthenticated = bcrypt.compareSync(password, user.password);

      if (!isAuthenticated){
        res.boom.unauthorized("Invalid credentials");
      } else{
        res.status(200).send({"statusCode":200, "user":user.username});
      }
    })
  };

  export const addUser = (req: Request, res: Response) => {
    const username = req.body.username;
    const password = req.body.password;
    if (!password || !username) {
      res.boom.badRequest("Username and password requied");
    }

    Users.findOne({ "username": req.body.username }, (err: any, users: any) => {
      if (err) {
        res.send(err);
      } else {
        if (!users) {
          const user = new Users(req.body);
          const salt = bcrypt.genSaltSync(10);
          const passwordHash = bcrypt.hashSync(req.body.password, salt);
          user.password = passwordHash;
          user.save((err: any) => {
            if (err) {
              res.send(err);
            } else {
              res.status(200).send({"statusCode":200, "user":user});
            }
          });
        } else {
          res.boom.conflict("User Already existes")
        }
      }
    });
  };