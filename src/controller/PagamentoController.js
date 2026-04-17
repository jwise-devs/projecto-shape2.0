const Pagamento = require("../model/Pagamento");
const Sessao = require("../model/Sessao");
const { pagarMpesa } = require("../services/mpesaService");
const { Op } = require("sequelize");

class PagamentoController {
  static async pagarSessao(req, res) {
    try {
      const { sessaoId, telefone } = req.body;

      if (!sessaoId || !telefone) {
        req.flash("error", "Pagamento falhou");
        return res.redirect("back");
      }

      const sessao = await Sessao.findByPk(sessaoId);

      if (!sessao) {
        req.flash("error", "Sessão não encontrada");
        return res.redirect("back");
      }

      const pagamentoExistente = await Pagamento.findOne({
        where: {
          sessaoId,
          status: {
            [Op.in]: ["SUCESSO", "PROCESSANDO"],
          },
        },
      });

      if (pagamentoExistente) {
        req.flash("error", "Esta sessão já foi paga ou está em processamento");
        return res.redirect("back");
      }

      // criar pagamento
      const pagamento = await Pagamento.create({
        sessaoId: sessao.id,
        userId: sessao.userId,
        valor: sessao.precoSessao,
        telefone,
        referencia: "REF" + Date.now(),
        status: "PENDENTE",
      });

      pagamento.status = "PROCESSANDO";
      await pagamento.save();

      const resultado = await pagarMpesa({
        valor: pagamento.valor,
        telefone: pagamento.telefone,
      });

      if (resultado.status === "SUCESSO") {
        pagamento.status = "SUCESSO";
        pagamento.transactionId = resultado.transactionId;

        sessao.status = "pago";
        await sessao.save();

        await pagamento.save();

        req.flash("success", "Pagamento realizado com sucesso!");
        return res.redirect("/dashboard");
      } else {
        pagamento.status = "FALHA";
        await pagamento.save();

        req.flash("error", "Pagamento falhou. Tente novamente.");
        return res.redirect("/dashboard");
      }
    } catch (error) {
      console.error(error);
      req.flash("error", "Erro ao processar pagamento");
      return res.redirect("/dashboard");
    }
  }
}

module.exports = PagamentoController;
