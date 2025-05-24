const express = require('express');
const criarPupilasController = require('../controller/CriarPupilasController');

const route = express.Router();

route.get('/funcionarios/create',criarPupilasController.index);
route.post('/funcionarios/create/data',criarPupilasController.create);

module.exports = route;