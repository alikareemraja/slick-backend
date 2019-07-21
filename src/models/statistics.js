const mongoose = require("mongoose");

const StatisticsSchema = new mongoose.Schema({
  searchItem: String,
  Date: String
});

module.exports = mongoose.model("Statistics", StatisticsSchema);
