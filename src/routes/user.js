"use strict";

const express  = require('express');
const router   = express.Router();

const middlewares    = require('../middlewares');
const UserController = require('../controllers/user');

// TODO: We need authorization too
router.get('/:uid/owned', middlewares.checkAuthentication, UserController.getOwnedItems); // Read owned items

// TODO: We need authorization too
router.post('/:uid/owned', middlewares.checkAuthentication, UserController.addOwnedItem); // Add new owned item

// TODO: We need authorization too
router.get('/:uid/owned/:itemId', middlewares.checkAuthentication, UserController.getOwnedItem); // Read a single owned item

// TODO: We need authorization too
router.delete('/:uid/owned/:itemId', middlewares.checkAuthentication, UserController.deleteOwnedItem); // Delete an item in Owned Items

// TODO: We need authorization too
router.put('/:uid/owned/:itemId', middlewares.checkAuthentication, UserController.updateOwnedItem); // Update an item in Owned Items

// TODO: We need authorization too
router.get('/:uid/wishlist', middlewares.checkAuthentication, UserController.getWishlistItems); // Read wishlist items

// TODO: We need authorization too
router.post('/:uid/wishlist', middlewares.checkAuthentication, UserController.addWishlistItem); // Add new wishlist item

// TODO: We need authorization too
router.delete('/:userId/wishlist/:itemId', middlewares.checkAuthentication, UserController.deleteWishlistItem); // Delete an item in Wishlist

module.exports = router;