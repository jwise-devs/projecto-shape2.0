const express = require('express');
const router = express.Router();

const FotoController = require('../controller/FotoController');

// Middleware para ignorar CSRF nessas rotas
function ignorarCSRF(req, res, next) {
  req.csrfToken = () => ''; // Anula a exigência do token
  next();
}

// Rota para upload de foto "antes" com CSRF ignorado
router.post('/foto_antes/upload/:sessaoId', ignorarCSRF, FotoController.store);

// Rota para upload de outras fotos com CSRF ignorado
router.post('/fotos/upload', ignorarCSRF, FotoController.store);

module.exports = router;
