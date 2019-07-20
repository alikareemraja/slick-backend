/* eslint-disable no-unused-vars */
"use strict";

const CommentModel = require("../models/comment");
const UserModel = require("../models/user");
const mongoose = require('mongoose');
var async = require('async');

const addCommentOnItem = (req, res) => {

    if (Object.keys(req.body).length === 0) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body is empty'
    });


    CommentModel.create(req.body)
        .then(item => {
            var parentId = req.params["parent"];

            if (parentId !== undefined) {
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
    }).then(item => { return { success: true, message: "" } })
        .exec()
        .catch(error => { return { success: false, message: error.message } })
}

const replyToComment = (req, res) => {

}

const getComment = (req, res) => {

    var itemId = req.params["itemId"];

    if (itemId === undefined)
        res.status(500).json({
            err: 'Internal server error',
            message: "No comment Id provided"
        });

    CommentModel.aggregate()
        .match({ item: mongoose.Types.ObjectId(itemId) })
        .graphLookup({
            from: 'comments', // Use the comment collection
            startWith: '$children', // Start looking at the document's `children` property
            connectFromField: 'children', // A link in the graph is represented by the children property...
            connectToField: '_id', // ... pointing to another comments's _id property
            maxDepth: 1, // Only recurse one level deep
            as: 'replies' // Store this in the `replies` property
        }).exec()
        .then(result => {
            var thread = [];
            for (var index = 0; index < result.length; ++index) {
                thread.push(parseCommentTree(result[index]));
            }

            res.status(200).json(thread)
        })
        .catch(err => res.status(500).json({
            err: 'Internal server error',
            message: err.message
        }));
}

const getUserDetails = (userId) => {
    return UserModel.findOne({ "_id": userId }).exec()
        .then(user => {

            return user;

        })
        .catch(error => { return null });
}

const parseCommentTree = (thread) => {

    var commentTree = [];
    var comment = {
        "_id": thread._id,
        "item": thread.item,
        "user": thread.user,
        "date": thread.date,
        "text": thread.text,
    };

    commentTree.push(comment);

    addReplies(commentTree[0], thread.children, thread)
    return commentTree;




}

const addReplies = (root, children, thread) => {

    var index = 0;
    var queue = [];
    root.replies = [];
    while (children.length > 0) {
        var comment = children.pop().toString();

        var reply = thread.replies.filter(obj => {
            return obj._id.toString() === comment;
        })[0];

        if (reply === undefined)
            continue;
        root.replies.push(reply);
        queue = reply.children;
        addReplies(root.replies[index], queue, thread);
        index++;
    }

}


const updateComment = (req, res) => {

    if (Object.keys(req.body).length === 0) {
        return res.status(400).json({
            error: 'Bad Request',
            message: 'The request body is empty'
        });
    }

    var commentId = req.params["commentId"];

    if (commentId === undefined)
        res.status(500).json({
            err: 'Internal server error',
            message: "No comment Id provided"
        });

    CommentModel.updateOne({ "_id": commentId }, { $set: { "text": req.body.text } }, {
        new: true,
        runValidators: true
    }).exec()
        .then(item => res.status(200).json(item))
        .catch(error => res.status(500).json({
            error: 'Internal server error',
            message: error.message
        }));

}

const removeComment = (req, res) => {

    var commentId = req.params["commentId"];

    if (commentId === undefined)
        res.status(500).json({
            err: 'Internal server error',
            message: "No comment Id provided"
        });

    CommentModel.findByIdAndRemove(commentId).exec()
        .then(() => res.status(200).json({ message: `Comment was deleted` }))
        .catch(error => res.status(500).json({
            error: 'Internal server error',
            message: error.message
        }));
}

module.exports = {
    addCommentOnItem,
    getComment,
    updateComment,
    removeComment
};