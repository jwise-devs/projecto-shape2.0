const express = require("express");
const router = express.Router();

const PagamentoController = require("../controllers/PagamentoController");

// rota para pagar sessão com M-Pesa
router.post("/mpesa/pagar", PagamentoController.pagarSessao);

module.exports = router;