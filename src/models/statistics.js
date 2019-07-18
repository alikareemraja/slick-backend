const mongoose = require("mongoose");

const StatisticsSchema = new mongoose.Schema({
  search_item: String,
  count: Number
});

//module.exports = mongoose.model("Item", itemSchema);
module.exports = mongoose.model("Statistics", StatisticsSchema);
