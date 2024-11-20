const express = require('express');
const route = express.Router();
const homeController = require('../controller/HomeController');

route.get('/',homeController.index);

module.exports = route;