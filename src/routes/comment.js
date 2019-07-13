"use strict";

const express  = require('express');
const router   = express.Router();

const middlewares    = require('../middlewares');
const CommentController = require('../controllers/comment');

// TODO: We need authorization too
router.post('/add/:parent?', middlewares.checkAuthentication, CommentController.addCommentOnItem); // add a comment
router.get('/get/:commentId', middlewares.checkAuthentication, CommentController.getComment); // get a thread owned items

module.exports = router;