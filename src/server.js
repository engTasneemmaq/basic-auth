"use strict";

require('dotenv').config();
const PORT = process.env.PORT || 3001;
const express = require("express");
const app = express();

// router
const notFoundHandler = require("./error-handlers/404");
const errorHandler = require("./error-handlers/500");
const signInRouter = require("./routes/signInRouter");
const signUpRouter = require("./routes/signUpRouter");


// // app.use
app.use(express.json());
app.use(signInRouter);
app.use(signUpRouter);



app.use("*", notFoundHandler);
app.use(errorHandler);
// start listening
function start(PORT) {
    app.listen(PORT, () => {
        console.log(`Listen and Running on port ${PORT}`);
    });
}
module.exports = {
    app: app,
    start: start,
};
