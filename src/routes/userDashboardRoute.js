const express = require('express');
const route = express.Router();
const userDashboardController = require('../controller/userDashboardController');
const {loginRequired} = require('../middlewares/middleware');

route.get('/dashboard',loginRequired,userDashboardController.index);


module.exports = route;