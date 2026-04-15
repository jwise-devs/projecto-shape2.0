const Pagamento = require("../models/Pagamento");
const Sessao = require("../models/Sessao");
const { pagarMpesa } = require("../services/mpesaService");

class PagamentoController {

  static async pagarSessao(req, res) {
    try {
      const { sessaoId, telefone } = req.body;

      // 1 Buscar sessão
      const sessao = await Sessao.findByPk(sessaoId);

      if (!sessao) {
        return res.status(404).json({ erro: "Sessão não encontrada" });
      }

      //  2 VERIFICAR SE JÁ FOI PAGA OU ESTÁ EM PROCESSAMENTO
      const pagamentoExistente = await Pagamento.findOne({
        where: {
          sessaoId,
          status: ["SUCESSO", "PROCESSANDO"]
        }
      });

      if (pagamentoExistente) {
        return res.status(400).json({
          erro: "Esta sessão já possui um pagamento concluído ou em processamento"
        });
      }

      // 3 Criar pagamento como PENDENTE
      const pagamento = await Pagamento.create({
        sessaoId: sessao.id,
        userId: sessao.userId,
        valor: sessao.precoSessao,
        telefone,
        referencia: "REF" + Date.now(),
        status: "PENDENTE",
      });

      // 4 Atualizar para PROCESSANDO
      pagamento.status = "PROCESSANDO";
      await pagamento.save();

      // 5 Chamar M-Pesa (simulado)
      const resultado = await pagarMpesa({
        valor: pagamento.valor,
        telefone: pagamento.telefone,
      });

      // 6 Atualizar resultado
      if (resultado.status === "SUCESSO") {
        pagamento.status = "SUCESSO";
        pagamento.transactionId = resultado.transactionId;

        // opcional: atualizar sessão
        sessao.status = "pago";
        await sessao.save();

      } else {
        pagamento.status = "FALHA";
      }

      await pagamento.save();

      return res.json({
        mensagem:
          resultado.status === "SUCESSO"
            ? "Pagamento realizado com sucesso"
            : "Pagamento falhou",
        pagamento,
      });

    } catch (error) {
      console.error(error);
      return res.status(500).json({ erro: "Erro ao processar pagamento" });
    }
  }
}

module.exports = PagamentoController;