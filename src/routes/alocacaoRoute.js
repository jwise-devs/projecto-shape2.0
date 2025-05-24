const express = require('express');
const AlocacaoController = require('../controller/AlocacaoController');

const route = express.Router();

route.get('/alocar-tratamento/:id',AlocacaoController.index);
route.post('/alocar-tratamento/data',AlocacaoController.storeAlocacao);

module.exports = route;