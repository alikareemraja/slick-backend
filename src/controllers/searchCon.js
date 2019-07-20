"use strict";
const ItemController = require("./item");
const ItemModel = require("../models/item");
/*
const search = (req, res) => {
  var text = req.query.category;
  ItemController.read_search(text).then(result =>
    continue_search(result, text).then(final => {
      return res.status(200).json(final);
    })
  );
};*/

const search = (req, res) => {
  var text = req.query.category;
  ItemController.read_search(text).then(result => {
    for (var index = 0; index < result.length; index++) {
      result[index].isRecommendedd = false;
    }
    continue_search(result, text).then(final => {
      return res.status(200).json(final);
    });
  });
};

const continue_search = (result, text) => {
  return ItemController.get_recommended(text).then(recommendedResults => {
    for (var index = 0; index < recommendedResults.length; index++) {
      recommendedResults[index].isRecommended = true;
    }
    result = result.concat(recommendedResults);
    return result;
    //return result.status(200).json(result);
  });
};

module.exports = {
  search,
  continue_search
};
