const express = require('express');
const route = express.Router();
const sessaoController = require('../controller/sessaoController');

route.get('/sessao', sessaoController.index);
route.post('/sessao/data', sessaoController.data);

// Rota extra para desk manager criar sessão para usuário específico
route.get('/sessao/novo/:usuarioId', sessaoController.novaSessao);
route.post('/sessao/novo/data/:usuarioId', sessaoController.criarSessaoParaUsuario);

module.exports = route;
