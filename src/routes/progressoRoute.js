const express = require('express');
const route = express.Router();
const progressoController = require('../controller/ProgressoController');

route.get('/progresso/:id',progressoController.index);



module.exports = route;