"use strict";

const express  = require('express');
const router   = express.Router();

const middlewares    = require('../middlewares');
const RetailerController = require('../controllers/retailer');


router.get('/', RetailerController.list); // List all retailers
router.post('/', middlewares.checkAuthentication, RetailerController.create); // Create a new retailer
router.get('/:id', RetailerController.read); // Read a retailer by Id
router.put('/:id', middlewares.checkAuthentication, RetailerController.update); // Update a retailer by Id
router.delete('/:id', middlewares.checkAuthentication, RetailerController.remove); // Delete a retailer by Id


module.exports = router;
