"use strict";
const express = require("express");
const router = express.Router();
const middlewares = require("../middlewares");
const SearchController = require("../controllers/searchCon");
const ItemController = require("../controllers/item");
const StatisticsController = require("../controllers/statistics");

router.get("/get", middlewares.checkAuthentication, SearchController.search);

router.get(
  "/getd",
  middlewares.checkAuthentication,
  ItemController.read_search_dup
);

//--------------------------------------------

router.get("/stat", middlewares.checkAuthentication, StatisticsController.list); // GET search statistics
router.post(
  // keep track of performed search operations
  "/addstat",
  middlewares.checkAuthentication,
  StatisticsController.create
);
/*
router.delete(
  "/delete/:id",
  middlewares.checkAuthentication,
  StatisticsController.remove
); // Delete history by Id
*/
module.exports = router;
