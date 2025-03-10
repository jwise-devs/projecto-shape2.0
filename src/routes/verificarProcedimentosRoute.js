const express = require('express');
const verificarProcedimentosController = require('../controller/VerificarProcedimentosController');


const route = express.Router();

route.get('/procedimentos/list',verificarProcedimentosController.index);
route.get('/procedimentos/index/:id',verificarProcedimentosController.editIndex);
route.post('/procedimentos/edit/:id',verificarProcedimentosController.update);
route.get('/procedimentos/delete/:id',verificarProcedimentosController.delete);
route.get('/procedimentos/search', verificarProcedimentosController.search);

module.exports = route;