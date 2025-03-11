const express = require('express');
const route = express.Router();
const fourofourController = require('../controller/404Controller');
const {loginRequired} = require('../middlewares/middleware');

route.get('/404',loginRequired,fourofourController.error404);


module.exports = route;