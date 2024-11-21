const express = require('express');
const route = express.Router();
const consultaController = require('../controller/ConsultaController');

route.get('/agendar',consultaController.index);

module.exports = route;