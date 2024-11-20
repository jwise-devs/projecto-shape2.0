const express = require('express');
const registroController = require('../controller/RegistroController');

const route = express.Router();

route.get('/login/register',registroController.index);

module.exports = route;