const express = require('express');
const route = express.Router();
const sobreController = require('../controller/SobreController');

route.get('/sobre',sobreController.index);

module.exports = route;