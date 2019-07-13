/* eslint-disable no-unused-vars */
"use strict";

const CommentModel = require("../models/comment");

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

    CommentModel.aggregate([
        {
            $graphLookup: {
                from: "comments",
                startWith: "$parent",
                connectFromField: "parent",
                connectToField: "_id",
                as: "ancestors"
            }
        },
        { $match: { "id": "5d2a1424d0fe46181324937d" } },
        {
            $addFields: {
                ancestors: {
                    $reverseArray: {
                        $map: {
                            input: "$ancestors",
                            as: "t",
                            in: { name: "$$t.name" }
                        }
                    }
                }
            }
        }
    ]).
        then(res => { console.log(res) }).
        catch(error => console.error('error', error));
}

const editComment = (req, res) => {

}

const removeComment = (req, res) => {

}

module.exports = {
    addCommentOnItem,
    getComment
};