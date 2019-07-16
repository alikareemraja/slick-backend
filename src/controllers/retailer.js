"use strict";

const mongoose = require('mongoose');

// Define the retailer schema

const RetailerSchema  = new mongoose.Schema({
    rname: {
        type: String,
        required: true
    },
    website: {
        type: String,
        required: true
    },

});

RetailerSchema.set('versionKey', false);
RetailerSchema.set('timestamps', true);

// Export the Retailer model
module.exports = mongoose.model('Retailer', RetailerSchema);
