const express = require('express');
const route = express.Router();
const contactoController = require('../controller/ContactoController');

route.get('/contacto',contactoController.index);

module.exports = route;