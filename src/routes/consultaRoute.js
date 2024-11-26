const express = require('express');
const route = express.Router();
const consultaController = require('../controller/ConsultaController');

route.get('/agendar',consultaController.index);
route.post('/agendar/data',consultaController.data);

module.exports = route;