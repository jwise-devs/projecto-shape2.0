const express = require('express');
const route = express.Router();
const sobreController = require('../controller/SobreController');

route.get('/prog',sobreController.index);

module.exports = route;