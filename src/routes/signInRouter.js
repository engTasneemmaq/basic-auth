"use strict";
const express = require("express");

const bcrypt = require('bcrypt');
const base64 = require('base-64');

const {Users} = require("../module/index");

const signInRouter = express.Router();
const basicAuth = require("../auth/basicAuth")

signInRouter.get("/users", getUsers);

async function getUsers(req, res) {
    const getUsers = await Users.findAll();
    res.status(200).json(getUsers);
}


signInRouter.post("/signin", basicAuth,async (req,res) => {
   let basicHeaderParts = req.headers.authorization.split(' ');
    let encoded = basicHeaderParts[1];
    console.log(encoded);
        let decoded = base64.decode(encoded);
        //decoded = "username:password"
        let username = decoded.split(":")[0];
        let password = decoded.split(":")[1];
        /* let [username,password] = decoded.split(":");*/
        try {
            const user = await Users.findOne({ where: {username: username}
            });
            const valid = await bcrypt.compare(password, user.password);
            if (valid) {
                res.status(200).json({user});
            } else {
                res.status(500).send("wrong username or password");
            }
        } catch {
            res.status(500).send("app error");
        }
    });



module.exports = signInRouter;