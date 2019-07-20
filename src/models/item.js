"use strict";

const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  title: String,
  category: String,
  brand: String,
  prices: [{ retailer: String, price: Number }],
  size: [String],
  color: [String],
  fabric: String,
  description: String,
  imageURL: String, // might require validation in db
  purchaseLink: String, // might require validation in db
  isRecommended: Boolean,
  reviews: [
    {
      reviewerId: Number,
      reviewTitle: String,
      reviewText: String,
      avgRating: Number,
      numRatings: Number
    }
  ]
});

module.exports = mongoose.model("Item", itemSchema);
