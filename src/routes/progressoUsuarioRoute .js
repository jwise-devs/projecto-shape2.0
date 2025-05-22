const express = require('express');
const route = express.Router();
const progressoUsuarioController = require('../controller/ProgressoUsuarioController');

route.get('/progresso_do_Usuario/:id',progressoUsuarioController.index);
route.post('/progresso/data/:id', progressoUsuarioController.salvarDatasComparecimento);

module.exports = route;