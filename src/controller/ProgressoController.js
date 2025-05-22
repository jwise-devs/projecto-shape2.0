const Sessao = require("../model/Sessao");
const Usuario = require("../model/Usuario");
const SessaoTratamentoData = require("../model/SessaoTratamentoData");

exports.index = async (req, res) => {
  try {
    const usuarioId = req.params.id;

    // Busca o usuário para mostrar o nome
    const usuario = await Usuario.findOne({
      where: { id: usuarioId },
      attributes: ['nome']
    });

    // Busca a sessão Pendente e garante trazer tratamentosArray
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

    // Parse do tratamentosArray, se estiver em string
    if (sessao.tratamentosArray && typeof sessao.tratamentosArray === 'string') {
      sessao.tratamentosArray = JSON.parse(sessao.tratamentosArray);
    }

    // Busca as datas de comparecimento para o usuário
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

      tratamentoDatas[tratamento].push({
        data,
        compareceu
      });
    });

    res.render('progresso', {
      sessao,
      usuario,
      tratamentoDatas
    });

  } catch (error) {
    console.error('Erro ao carregar progresso:', error);
    req.flash('error', 'Erro ao carregar o progresso.');
    res.redirect('back');
  }
};
