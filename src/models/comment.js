"use strict";

const mongoose = require('mongoose');

const commentSchema  = new mongoose.Schema({
    
    children : [{
        type: mongoose.Schema.ObjectId,
        ref: 'Comment'
    }],
    
    item : {
        type: mongoose.Schema.ObjectId,
        ref: 'Item'
    },

    user:{
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },

    date: {
        type: Date,
        required: true
    },
    text: {
        type: String,
        required: true,
    }
    
});

module.exports = mongoose.model('Comment', commentSchema);