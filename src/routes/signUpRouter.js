"use strict";
const express = require("express");

const bcrypt = require('bcrypt');

const {Users} = require("../module/index");

const signUpRouter = express.Router();

signUpRouter.get("/users", getUsers)


async function getUsers(req, res) {
    const getUsers = await Users.findAll();
    res.status(200).json(getUsers);
}


signUpRouter.post("/signUp",async (req,res) => {
    try {
        let username = req.body.username;
        let validUserName = await Users.findOne({
            where: {username: username }
        });
        if (validUserName) {
            res.status(500).send("username should be unique");
        } else {
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
});


module.exports = signUpRouter;