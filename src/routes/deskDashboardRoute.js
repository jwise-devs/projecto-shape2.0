const express = require('express');
const route = express.Router();
const deskDashboardController = require('../controller/DeskDashboardController');
const {loginRequired} = require('../middlewares/middleware');

route.get('/deskdashboard',loginRequired,deskDashboardController.index);
route.get('/deskcadastro/create/:verificador',deskDashboardController.createIndex);
route.get("/emails/count", deskDashboardController.getEmailCount);


module.exports = route;