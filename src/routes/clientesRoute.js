const express = require('express');
const route = express.Router();
const clientesController = require('../controller/clientesController');

route.get('/clientes',clientesController.index);
route.get('/clientes/index/:id',clientesController.editIndex);
route.post('/clientes/edit/:id',clientesController.edit);
route.get('/clientes/delete/:id',clientesController.delete);
// route.post('/sessao/data',sessaoController.data);

module.exports = route;