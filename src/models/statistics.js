const mongoose = require("mongoose");

const statisticSchema = new mongoose.Schema({
  searchItem: String,
  Date: String
});

module.exports = mongoose.model("Statistic", statisticSchema);
