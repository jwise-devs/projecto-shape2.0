const express = require('express')
const route = express.Router();
const homeController = require('./src/controllers/HomeController')

route.get('/',homeController.index);

module.exports = route;