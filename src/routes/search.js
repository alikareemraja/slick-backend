"use strict";
const express = require("express");
const router = express.Router();
const middlewares = require("../middlewares");
const ItemController = require("../controllers/item");
//const StatisticsController = require("../controllers/statistics");

router.get("/get", middlewares.checkAuthentication, ItemController.read_search); // search for Item
//router.get("/getstat", middlewares.checkAuthentication, StatisticsController.list); // GET search statistics
//router.post( // keep track of performed search operations
//  "/addstat",
//  middlewares.checkAuthentication,
//  StatisticsController.create
//);

router.post("/", middlewares.checkAuthentication, ItemController.create); // Add Item to wardrobe

module.exports = router;
