"use strict";
const ItemController = require("./item");
const ItemModel = require("../models/item");

const test = (req, res) => {
  let t = "CREATE";
  var obj = JSON.parse('{ "name":"John", "age":30, "city":"New York"}');
  // Objdata = JSON.parse(t);
  // x = JSON.parse(t);
  //var x = JSON.stringify(t);
  var x = { t };
  return "FMT";
  //res.status(200).json(obj);
};

const search = (req, res) => {
  var text = req.query.category;
  ItemController.read_search(text).then(result => {
    for (var index = 0; index < result.length; index++) {
      result[index].isRecommended = false;
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
  test,
  continue_search
};
