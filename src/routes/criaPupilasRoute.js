const express = require('express');
const criarPupilasController = require('../controller/CriarPupilasController');
const multer = require('multer');
const multerConfig = require('../config/multerConfig'); // caminho correto para seu config

const upload = multer(multerConfig);



const route = express.Router();

route.get('/funcionarios/create',criarPupilasController.index);
route.post('/funcionarios/create/data',upload.single('fotoPupila'),criarPupilasController.create);


module.exports = route;