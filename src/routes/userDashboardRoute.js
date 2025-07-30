const express = require('express');
const route = express.Router();
const userDashboardController = require('../controller/userDashboardController');
const {loginRequired} = require('../middlewares/middleware');

route.get('/dashboard',loginRequired,userDashboardController.index);
route.post('/cancelar/:id',loginRequired,userDashboardController.cancelar);


module.exports = route;