const express = require('express');
const loginController = require('../controller/LoginController');

const route = express.Router();

route.get('/login/index',loginController.index);

module.exports = route;