const express = require('express');
const route = express.Router();
const tratamentoController = require('../controller/TratamentoController');

route.get('/tratamento',tratamentoController.index);

module.exports = route;