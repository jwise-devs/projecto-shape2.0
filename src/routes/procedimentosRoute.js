const express = require('express');
const route = express.Router();
const procedimentosController = require('../controller/procedimentosController');

route.get('/procedimentos',procedimentosController.index);


module.exports = route;