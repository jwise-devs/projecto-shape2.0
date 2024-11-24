const express = require('express');
const loginController = require('../controller/LoginController');

const route = express.Router();

route.get('/login/index',loginController.index);
route.post('/login/login',loginController.login);
route.get("/login/logout", loginController.logout);

module.exports = route;