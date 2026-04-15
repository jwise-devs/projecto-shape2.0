async function simularPagamentoMpesa({ valor, telefone }) {
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
    }, 2000);
  });
}

// FUTURO: integração real (ainda vazio por enquanto)
async function pagarMpesaReal(dados) {
  throw new Error("Integração com M-Pesa real ainda não implementada");
}

//  FUNÇÃO PRINCIPAL (é esta que o controller vai usar)
async function pagarMpesa(dados) {
  if (process.env.MPESA_ENV === "sandbox") {
    return await simularPagamentoMpesa(dados);
  } else {
    return await pagarMpesaReal(dados);
  }
}

module.exports = {
  pagarMpesa
};