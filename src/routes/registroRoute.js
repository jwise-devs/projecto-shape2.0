const express = require('express');
const registroController = require('../controller/RegistroController');

const route = express.Router();

route.get('/login/register',registroController.index);
// route.post("/login/register", registroController.register);

module.exports = route;