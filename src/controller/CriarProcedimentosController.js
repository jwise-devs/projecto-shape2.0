const Tratamentos = require('../model/Tratamentos');
const { Op } = require("sequelize");

exports.index = (req, res) => {
  res.render('criarProcedimentos');
};

exports.create = async (req, res) => {
  try {

    const { pacote, subpacote, procedimentos, valor } = req.body;
    const precoTrat = parseFloat(valor).toFixed(2);

    if (!pacote || !procedimentos || !valor) {
      req.flash('error', 'Por favor, preenche os campos: pacote, procedimentos e valor');
      return req.session.save(() => res.redirect('back'));
    }

    if (isNaN(precoTrat)) {
      req.flash('error', 'Por favor, o campo preco tem que ser um numero valido');
      return req.session.save(() => res.redirect('back'));
    }

    const subpacotesExistentes = await Tratamentos.findOne({
      where: {
        pacote: pacote,
        subpacote: { [Op.ne]: null } // Busca qualquer subpacote diferente de NULL
      }
    });

    if (subpacotesExistentes && (!subpacote || subpacote === "" || subpacote === "Nenhum subpacote")) {
      req.flash('error', 'Por favor, o pacote possui subpacote/s, nao pode deixar o campo subpacote em branco');
      return req.session.save(() => res.redirect('back'));
    }

    const tratamentos = await Tratamentos.create({
      nome: procedimentos,
      pacote: pacote,
      subpacote: subpacote,
      preco: precoTrat,
    })

    // Flash message de sucesso
    req.flash('success', 'Procedimento criado com sucesso!');
    req.session.save(function () {

      return res.redirect('back'); // Redireciona para o dashboard
    })

  } catch (error) {
    console.error(error);
    // Captura erros de validação do Sequelize
    if (error.errors) {
      const mensagens = error.errors.map((err) => err.message);
      req.flash('error', mensagens); // Define mensagens de erro no flash
    } else {
      req.flash('error', 'Erro inesperado. Tente novamente!');
    }

    // Redireciona de volta para a página de registro
    req.session.save(function () {

      return res.redirect('back');

    })
  }
};
