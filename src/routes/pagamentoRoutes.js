const express = require("express");
const router = express.Router();
const PagamentoController = require("../controller/PagamentoController");

router.post("/mpesa/pagar", PagamentoController.pagarSessao);
console.log("🔥 PAGAMENTO ROUTES CARREGADAS");

router.post("/mpesa/pagar", (req, res) => {
  console.log("🔥 ROTA MPESA CHAMADA");
  res.send("OK");
});

module.exports = router;