const Sessao = require("../model/Sessao");
const Usuario = require("../model/Usuario");
const SessaoTratamentoData = require("../model/SessaoTratamentoData");
const Tratamento = require("../model/Tratamentos"); // importe seu model de tratamento

exports.index = async (req, res) => {
  try {
    const usuarioId = req.params.id;

    // Busca usuário
    const usuario = await Usuario.findOne({
      where: { id: usuarioId },
      attributes: ['nome']
    });

    // Busca sessão Pendente
    const sessao = await Sessao.findOne({
      where: {
        userId: usuarioId,
        status: "Pendente"
      },
      attributes: ['id', 'userId', 'status', 'tratamentosArray']
    });

    if (!sessao) {
      req.flash('error', 'Sessão não encontrada.');
      return res.redirect('back');
    }

    // Parse tratamentosArray
    if (sessao.tratamentosArray && typeof sessao.tratamentosArray === 'string') {
      sessao.tratamentosArray = JSON.parse(sessao.tratamentosArray);
    }

    // Busca datas de comparecimento
    const datas = await SessaoTratamentoData.findAll({
      where: { usuarioId }
    });

    // Agrupa datas por tratamento
    const tratamentoDatas = {};
    datas.forEach(entry => {
      const tratamento = entry.nomeTratamento;
      const data = entry.dataComparecimento;
      const compareceu = entry.compareceu;

      if (!tratamentoDatas[tratamento]) {
        tratamentoDatas[tratamento] = [];
      }
      tratamentoDatas[tratamento].push({ data, compareceu });
    });

    // Busca sessões previstas para cada tratamento que está na sessao.tratamentosArray
    // Importante: Buscar no model Tratamento pelo nome (ou pelo campo que você tiver)
    const tratamentosInfo = {}; // { nomeTratamento: { sessoesPrevistas, datasTratamento } }
    for (const nomeTratamento of sessao.tratamentosArray) {
      const tratamentoDB = await Tratamento.findOne({
        where: { nome: nomeTratamento },
        attributes: ['sessoesPrevistas']
      });

      tratamentosInfo[nomeTratamento] = {
        sessoesPrevistas: tratamentoDB ? tratamentoDB.sessoesPrevistas : 0,
        datasTratamento: tratamentoDatas[nomeTratamento] || []
      };
    }

    const mostrarTratamentos = sessao.status === 'Pendente';

    res.render('progressoUsuario', {
      sessao,
      usuario,
      tratamentosInfo,
      mostrarTratamentos,
      csrfToken: req.csrfToken()
    });

  } catch (error) {
    console.error('Erro ao carregar progresso:', error);
    req.flash('error', 'Erro ao carregar o progresso.');
    res.redirect('back');
  }
};

exports.salvarDatasComparecimento = async (req, res) => {
  try {
    const usuarioId = req.params.id;
    const comparecimentos = req.body.comparecimentos || {};
    const novasDatas = req.body.novasDatas || {};

    // Atualiza ou cria entradas para checkboxes
    for (const tratamento in comparecimentos) {
      for (const entry of Object.values(comparecimentos[tratamento])) {
        const data = entry.data;
        const compareceu = entry.compareceu ? true : false;

        const existente = await SessaoTratamentoData.findOne({
          where: {
            usuarioId,
            nomeTratamento: tratamento,
            dataComparecimento: data
          }
        });

        if (existente) {
          existente.compareceu = compareceu;
          await existente.save();
        } else {
          await SessaoTratamentoData.create({
            usuarioId,
            nomeTratamento: tratamento,
            dataComparecimento: data,
            compareceu
          });
        }
      }
    }

    // Adiciona novas datas sem presença marcada
    for (const tratamento in novasDatas) {
      for (const data of novasDatas[tratamento]) {
        if (data) {
          const existente = await SessaoTratamentoData.findOne({
            where: {
              usuarioId,
              nomeTratamento: tratamento,
              dataComparecimento: data
            }
          });

          if (!existente) {
            await SessaoTratamentoData.create({
              usuarioId,
              nomeTratamento: tratamento,
              dataComparecimento: data,
              compareceu: false
            });
          }
        }
      }
    }

    req.flash("success", "Progresso salvo com sucesso!");
    res.redirect("/procedimentos");

  } catch (error) {
    console.error("Erro ao salvar progresso:", error);
    req.flash("error", "Erro ao salvar progresso.");
    res.redirect("back");
  }
};