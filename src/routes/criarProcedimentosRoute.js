const express = require('express');
const criarProcedimentosController = require('../controller/CriarProcedimentosController');

const route = express.Router();

route.get('/procedimentos/create',criarProcedimentosController.index);
route.post('/procedimentos/create/data',criarProcedimentosController.create);

module.exports = route;