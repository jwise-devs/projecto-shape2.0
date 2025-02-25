const express = require('express');
const route = express.Router();
const adminDashboardController = require('../controller/adminDashboardController');
const {loginRequired} = require('../middlewares/middleware');

route.get('/admindashboard',loginRequired,adminDashboardController.index);


module.exports = route;