const express = require('express');
const criarProcedimentosController = require('../controller/CriarProcedimentosController');

const route = express.Router();

route.get('/procedimentos/create',criarProcedimentosController.index);

module.exports = route;