/* eslint-disable no-unused-vars */
"use strict";

const CommentModel = require("../models/comment");
const mongoose = require('mongoose');

const addCommentOnItem = (req, res) => {

    if (Object.keys(req.body).length === 0) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body is empty'
    });


    CommentModel.create(req.body)
        .then(item => {
            var parentId = req.params["parent"];

            if (parentId !== undefined){
                var result = updateParent(parentId, item);
                if (result.success !== true)
                    res.status(500).json({
                    err: 'Internal server error',
                    message: result.message
                }) 
            }
            return res.status(200).json(item)
        })
        .catch(err => res.status(500).json({
            err: 'Internal server error',
            message: err.message
        }));
}

const updateParent = (parentId, child) => {

    CommentModel.findByIdAndUpdate(parentId, { $push: { children: child._id } }, {
        new: true,
        runValidators: true
    }).then(item => {return {success: true, message: ""}})
    .exec()
        .catch(error =>  {return {success: false, message: error.message} })
}

const replyToComment = (req, res) => {

}

const getComment = (req, res) => {

    var commentId = req.params["commentId"];

    if (commentId === undefined)
                    res.status(500).json({
                    err: 'Internal server error',
                    message: "No comment Id provided"
                }); 

    CommentModel.aggregate()
    .match({ _id: mongoose.Types.ObjectId(commentId) })
    .graphLookup({
        from: 'comments', // Use the comment collection
        startWith: '$children', // Start looking at the document's `children` property
        connectFromField: 'children', // A link in the graph is represented by the children property...
        connectToField: '_id', // ... pointing to another comments's _id property
        //maxDepth: 1, // Only recurse one level deep
        as: 'replies' // Store this in the `replies` property
      }).exec()
        .then(result => { res.status(200).json(result) })
        .catch(err => res.status(500).json({
            err: 'Internal server error',
            message: err.message
        }));
}

const parseCommentTree = (tree) => {

}

const editComment = (req, res) => {

}

const removeComment = (req, res) => {

}

module.exports = {
    addCommentOnItem,
    getComment
};