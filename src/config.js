"use strict";

// Configuration variables
const port = process.env.PORT || "3001";
const mongoURI = process.env.MONGODB_URI || "mongodb://localhost/slick";
const JwtSecret = process.env.JWT_SECRET || "slick secret";

module.exports = {
  port,
  mongoURI,
  JwtSecret
};
