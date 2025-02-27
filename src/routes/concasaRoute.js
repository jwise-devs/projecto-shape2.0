const express = require('express');
const route = express.Router();
const consultacasaController = require("../controller/ConsultaCasaController");

route.get('/consultaemcasa',consultacasaController.index);
route.post('/consultaemcasa/dados',consultacasaController.data);
route.post('/consultaemcasa/solicitar',consultacasaController.solicitarServico);

module.exports = route;