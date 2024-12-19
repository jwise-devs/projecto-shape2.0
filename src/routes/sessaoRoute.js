const express = require('express');
const route = express.Router();
const sessaoController = require('../controller/sessaoController');

route.get('/sessao',sessaoController.index);
route.post('/sessao/data',sessaoController.data);

module.exports = route;