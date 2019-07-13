"use strict";

const express    = require("express");
const bodyParser = require("body-parser");
const helmet     = require("helmet");

const middlewares = require("./middlewares");

const auth  = require("./routes/auth");
const item = require("./routes/item");
const user = require("./routes/user")
const comment = require("./routes/comment")

const api = express();

// Adding Basic Middlewares
api.use(helmet());
api.use(bodyParser.json());
api.use(bodyParser.urlencoded({ extended: false }));
api.use(middlewares.allowCrossDomain);

// Basic route
api.get("/", (req, res) => {
    res.json({
        name: "Slick Backend"
    });
});

// API routes
api.use("/auth", auth);
api.use("/items", item);
api.use("/users", user);
api.use("/comment", comment);

module.exports = api;