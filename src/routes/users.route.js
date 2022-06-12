"use strict";
const express = require("express");

const bcrypt = require('bcrypt');
const base64 = require('base-64');

const {Users} = require("../module/index");

const usersRouter = express.Router();

usersRouter.get("/users", getUsers)
usersRouter.post("/signup", getSignUp);
usersRouter.post("/signin", getSignin);


async function getUsers (req, res){              
  const getUsers = await Users.findAll();        
          res.status(200).json(getUsers);   
          }

 async function getSignUp (req, res){
  try {
      let username = req.body.username;
      let validUserName = await Users.findOne({ where: { username: username } });
      if(validUserName){
        res.status(500).send("username should be unique");
      }
      else{
        let password = await bcrypt.hash(req.body.password, 10);

        console.log('username', username);
        console.log('password', password);
  
        const record = await Users.create({
            username: username,
            password: password,
        })
        res.status(201).json(record);
      }

  } catch (e) {
      throw new Error('signup error');
  }
};

async function getSignin (req, res) {
  if (req.headers.authorization) {
      //Basic YWhtYWQ6YWhtYWQxMjM=
      let basicHeaderParts = req.headers.authorization.split(" ");
      //basicHeaderParts = ['Basic','YWhtYWQ6YWhtYWQxMjM=']

      let encoded = basicHeaderParts[1];
      //encoded = 'YWhtYWQ6YWhtYWQxMjM='

      let decoded = base64.decode(encoded);
      //decoded = "username:password"
      let username = decoded.split(":")[0];
      let password = decoded.split(":")[1];

      /* let [username,password] = decoded.split(":");*/
      try {
          const user = await Users.findOne({ where: { username: username } });
          const valid = await bcrypt.compare(password, user.password);
          if (valid) {
              res.status(200).json({
                  user
              });
          } else {
              res.status(500).send("wrong username or password");
          }
      } catch {
          res.status(500).send("app error");
      }
  }
};


module.exports = usersRouter;