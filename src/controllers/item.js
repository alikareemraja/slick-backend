"use strict";

const ItemModel = require("../models/item");

const create = (req, res) => {
  if (Object.keys(req.body).length === 0)
    return res.status(400).json({
      error: "Bad Request",
      message: "The request body is empty"
    });

  ItemModel.create(req.body)
    .then(item => res.status(201).json(item))
    .catch(err =>
      res.status(500).json({
        err: "Internal server error",
        message: err.message
      })
    );
};

const read = (req, res) => {
  ItemModel.findById(req.params.id)
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

const update = (req, res) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({
      error: "Bad Request",
      message: "The request body is empty"
    });
  }

  ItemModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  })
    .exec()
    .then(item => res.status(200).json(item))
    .catch(error =>
      res.status(500).json({
        error: "Internal server error",
        message: error.message
      })
    );
};

const remove = (req, res) => {
  ItemModel.findByIdAndRemove(req.params.id)
    .exec()
    .then(() =>
      res
        .status(200)
        .json({ message: `Movie with id${req.params.id} was deleted` })
    )
    .catch(error =>
      res.status(500).json({
        error: "Internal server error",
        message: error.message
      })
    );
};

const list = (req, res) => {
  MovieModel.find({})
    .exec()
    .then(movies => res.status(200).json(movies))
    .catch(error =>
      res.status(500).json({
        error: "Internal server error",
        message: error.message
      })
    );
};

const read_search = text => {
  return ItemModel.find({ category: new RegExp(text, "i") })
    .exec()
    .then(item => {
      if (!item) return null;
      return item;
    })
    .catch(error =>
      res.status(500).json({
        error: "Internal Server Error",
        message: error.message
      })
    );
};

const get_recommended = text => {
  return ItemModel.aggregate([
    { $match: { category: new RegExp(text, "i") } },
    { $sample: { size: 3 } }
  ])
    .exec()
    .then(item => {
      if (!item)
        return res.status(404).json({
          error: "Not Found",
          message: `Item not found`
        });
      return item;
      //res.status(200).json(item);
    })
    .catch(error =>
      res.status(500).json({
        error: "Internal Server Error",
        message: error.message
      })
    );
};

const read_search_dup = (req, res) => {
  var text = req.query.category;
  ItemModel.find({ category: text })
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

const related = (req, res) => {
  ItemModel.findById(req.params.id).exec()
  .then(item => {
    ItemModel.aggregate([
      { $match: { category: item.category } },
      { $sample: { size: 3 } }
    ])
      .exec()
      .then(recommendedResults => {
        /*var i = 0;
        var results;
        for (var index = 0; index < recommendedResults.length; index++) {
          if(recommendedResults[index].id != req.params.id && i < 2)
          result[i] = recommendedResults[index];
          i++;
        }*/
        //return result;
      
        res.status(200).json(recommendedResults);
      })
      .catch(error =>
        res.status(500).json({
          error: "Internal Server Error",
          message: error.message
        })
      );
  })
  .catch(error => res.status(500).json({
      error: 'Internal Server Error',
      message: error.message
  }));
};


module.exports = {
  create,
  read,
  read_search,
  read_search_dup,
  get_recommended,
  update,
  remove,
  related,
  list
};
