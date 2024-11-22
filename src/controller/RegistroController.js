const Usuario = require('../model/Usuario');

exports.index = (req, res) => {
  res.render('registro'); // Página de registro
};

exports.register = async (req, res) => {
  try {
    // Tenta criar o novo usuário
    const novoUsuario = await Usuario.create(req.body);

    // Flash message de sucesso
    req.flash('success', 'Usuário registrado com sucesso!');
    req.session.save(function (){

        return res.redirect('/dashboard'); // Redireciona para o dashboard
    })
    
  } catch (error) {
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
