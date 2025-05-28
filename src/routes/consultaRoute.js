const express = require('express');
const route = express.Router();
const consultaController = require('../controller/ConsultaController');
const { verificarFichaPreenchida } = require('../middlewares/middleware');

route.get('/agendar',verificarFichaPreenchida,consultaController.index);
route.post('/agendar/data',consultaController.data);

route.get('/agendar/:id',verificarFichaPreenchida,consultaController.cliente);

route.post('/agendar/data/:usuarioId',consultaController.dataCliente);

module.exports = route;