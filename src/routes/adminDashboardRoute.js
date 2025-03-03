const express = require('express');
const route = express.Router();
const adminDashboardController = require('../controller/adminDashboardController');
const {loginRequired} = require('../middlewares/middleware');

route.get('/admindashboard',loginRequired,adminDashboardController.index);
route.get('/admincadastro/create/:verificador',adminDashboardController.createIndex);
route.get("/emails/count", adminDashboardController.getEmailCount);


module.exports = route;