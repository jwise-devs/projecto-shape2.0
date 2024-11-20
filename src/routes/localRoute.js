const express = require('express');
const route = express.Router();
const localController = require('../controller/LocalController');

route.get('/local',localController.index);

module.exports = route;