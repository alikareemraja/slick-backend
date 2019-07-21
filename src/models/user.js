"use strict";

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    ownedItems: [{
        //itemId: { type: Number, required: true },
        imageURL: { type: String, required: true },
        title: { type: String, required: true },
        description: String,
        comments: [{ commenterId: { type: Number, required: true }, comment: { type: String, required: true } }]
    }],
    wishlist: [mongoose.Schema.Types.ObjectId],
    name: String,
    imageURL: String
});

module.exports = mongoose.model('User', userSchema);