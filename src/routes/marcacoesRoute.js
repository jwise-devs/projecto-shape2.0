const express = require('express');
const route = express.Router();
const MarcacoesController = require('../controller/MarcacoesController');

route.get('/marcacoes',MarcacoesController.index);


module.exports = route;