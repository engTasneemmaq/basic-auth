"use strict";

require("dotenv").config();

let PORT = process.env.PORT || 3001;
const server = require("./src/server");

const { db } = require("./src/module/index");

db.sync()
    .then(() => {
        // start();
        server.start(PORT);
    })
    .catch(console.error);

