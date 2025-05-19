const express = require('express');
const route = express.Router();
const PerfilController = require('../controller/PerfilController');

route.get('/perfil',PerfilController.index);


module.exports = route;