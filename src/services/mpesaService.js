async function pagarMpesa({ valor, telefone }) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const sucesso = Math.random() > 0.2; // 80% sucesso

      if (sucesso) {
        resolve({
          status: "SUCESSO",
          transactionId: "TX" + Date.now(),
        });
      } else {
        resolve({
          status: "FALHA",
        });
      }
    }, 1500);
  });
}

module.exports = {
  pagarMpesa,
};