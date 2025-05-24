const express = require('express');
const route = express.Router();
const pupilasController = require('../controller/PupilasController');

route.get('/funcionarios',pupilasController.index);
route.get('/funcionarios/index/:id',pupilasController.editIndex);
route.post('/funcionarios/edit/:id',pupilasController.edit);
route.get('/funcionarios/delete/:id',pupilasController.delete);

module.exports = route;