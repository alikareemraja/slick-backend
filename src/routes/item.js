"use strict";

const express  = require('express');
const router   = express.Router();

const middlewares    = require('../middlewares');
const ItemController = require('../controllers/item');


//router.get('/', ItemController.list); // List all items
router.post('/', middlewares.checkAuthentication, ItemController.create); // Add Item to wardrobe
router.get('/:id', ItemController.read); // Read an Item by Id
router.get('/rel/:id', ItemController.related);// Get related Items

router.post('/photo', ItemController.uploadPhoto);// Get related Items
router.get('/photo', ItemController.getFile);// Get related Items

// TODO: We need authorization for updating too
router.put('/:id', middlewares.checkAuthentication, ItemController.update); // Update an Item by Id

// TODO: We need authorization for deleting too
router.delete('/:id', middlewares.checkAuthentication, ItemController.remove); // Delete a movie by Id

module.exports = router;