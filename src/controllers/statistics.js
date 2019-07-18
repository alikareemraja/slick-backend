"use strict";

const StatisticsModel = require("../models/statistics");

const read = (req, res) => {
  StatisticsModel.find()
    .exec()
    .then(item => {
      if (!item)
        return res.status(404).json({
          error: "Not Found",
          message: `Item not found`
        });

      res.status(200).json(item);
    })
    .catch(error =>
      res.status(500).json({
        error: "Internal Server Error",
        message: error.message
      })
    );
};

const list = (req, res) => {
  StatisticsModel.find({})
    .exec()
    .then(items => res.status(200).json(items))
    .catch(error =>
      res.status(500).json({
        error: "Internal server error",
        message: error.message
      })
    );
};

const create = (req, res) => {
  if (Object.keys(req.body).length === 0)
    return res.status(400).json({
      error: "Bad Request",
      message: "The request body is empty"
    });

  StatisticsModel.create(req.body)
    .then(item => res.status(201).json(item))
    .catch(err =>
      res.status(500).json({
        err: "Internal server error",
        message: err.message
      })
    );
};

module.exports = {
  read,
  list,
  create
};
