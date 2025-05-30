const express = require('express');
const route = express.Router();
const pupilasController = require('../controller/PupilasController');
const multer = require('multer');
const multerConfig = require('../config/multerConfig'); // caminho correto para seu config

const upload = multer(multerConfig);

route.get('/funcionarios',pupilasController.index);
route.get('/funcionarios/index/:id',pupilasController.editIndex);
route.post('/funcionarios/edit/:id',upload.single('fotoPupila'),pupilasController.edit);
route.get('/funcionarios/delete/:id',pupilasController.delete);

module.exports = route;