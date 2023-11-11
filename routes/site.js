const express = require('express');
const router = express.Router();
const path = require('path');

const siteController = require("../controllers/siteController");

// get/read routes
router.get('/', siteController.getHome);
router.get('/customers', siteController.getCustomers);
router.get('/items', siteController.getItems);
router.get('/sales', siteController.getSales);

// post/create routes
router.get('/addCustomer', siteController.postaddCustomer);
router.post('/insertCustomer', siteController.postNewCustomer);
router.get('/addItem', siteController.postaddItem);
router.post('/insertItem', siteController.postNewItem);

// update routes
router.get('/updateCustomers/:id', siteController.getUpdateCustomer);
router.post('/updateCustomer', siteController.postUpdateCustomer);

exports.routes = router;