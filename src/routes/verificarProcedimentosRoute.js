const express = require('express');
const verificarProcedimentosController = require('../controller/VerificarProcedimentosController');

const route = express.Router();

route.get('/procedimentos/list',verificarProcedimentosController.index);

module.exports = route;