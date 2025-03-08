const Usuario = require('../model/Usuario');
const Ficha_De_Dados = require('../model/Ficha_De_Dados');

exports.index = (req, res) => {
  res.render('criarProcedimentos');
};

exports.register = async (req, res) => {
  try {
    

    // Flash message de sucesso
    req.flash('success', 'Usuário registrado com sucesso!');
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
