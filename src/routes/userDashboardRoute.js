const express = require('express');
const route = express.Router();
const userDashboardController = require('../controller/userDashboardController');

route.get('/dashboard',userDashboardController.index);

module.exports = route;