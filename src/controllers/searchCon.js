"use strict";
const ItemController = require("./item");
const ItemModel = require("../models/item");

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
    recommendedResults = recommendedResults.concat(result);
    //result = result.concat(recommendedResults);
    return recommendedResults;
    //return result.status(200).json(result);
    /*    var mySet = new Set(result);
    var filteredrecommendedResults = Array.from(mySet);
    // filteredrecommendedResults.sort(); // [1,2,3,4,5,6,7]

    return filteredrecommendedResults;*/
  });
};

module.exports = {
  search,
  continue_search
};
