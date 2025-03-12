const express = require('express');
const route = express.Router();
const fourofourController = require('../controller/404Controller');

route.get('/404',fourofourController.error404);


module.exports = route;