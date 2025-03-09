const Tratamentos = require('../model/Tratamentos');

exports.index = (req, res) => {
  res.render('criarProcedimentos');
};

exports.create = async (req, res) => {
  try {
    
    const {pacote,subpacote,procedimentos,valor} = req.body;
    const precoTrat = parseFloat(valor).toFixed(2);

    const tratamentos = await Tratamentos.create({
      nome: procedimentos,
      pacote: pacote,
      subpacote: subpacote || "Nenhum subpacote",
      preco: precoTrat,
    })

    // Flash message de sucesso
    req.flash('success', 'Procedimento criado com sucesso!');
    req.session.save(function (){

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
    req.session.save(function (){

        return res.redirect('back');
    
    })
  }
};
