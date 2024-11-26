const express = require('express');
const route = express.Router();
const sessaoController = require('../controller/sessaoController');

route.get('/sessao',sessaoController.index);

module.exports = route;