const Usuario = require('../model/Usuario');

exports.index = (req, res) => {
  res.render('login');
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body; // Pega os dados do formulário de login

    // Verifica se o e-mail foi informado
    if (!email || !password) {
      req.flash('error', 'E-mail e senha são obrigatórios.');
      req.session.save(() => res.redirect('back'));
      return;
    }



    // Busca o usuário no banco pelo e-mail
    const user = await Usuario.findOne({ where: { email } });

    const role = await Usuario.findOne({ where: { role: 'admin',email } });

    // Verifica se o usuário existe e se a senha é válida
    if (!user || !(await user.passwordIsValid(password))) {
      req.flash('error', 'E-mail ou senha inválidos.');
      req.session.save(() => res.redirect('back'));
      return;
    }

    
    // const role = await Usuario.findOne({where: {}})

    // Autentica o usuário e salva na sessão
    req.session.user = {
      id: user.id,
      nome: user.nome,
      email: user.email,
      role: user.role,
    };

    if(!role){
      
      req.flash('success', 'Login realizado com sucesso.');
      req.session.save(() => res.redirect('/dashboard')); // Redireciona para o dashboard

    }else{
      req.flash('success', 'Login realizado com sucesso.');
      req.session.save(() => res.redirect('/admindashboard')); // Redireciona para o dashboard
    }

  } catch (error) {
    console.error(error);
    req.flash('error', 'Erro ao tentar realizar login.');
    req.session.save(() => res.redirect('back'));
  }
};

exports.logout = (req, res) => {
  // Para fazer logout utiliza o comando "req.session.destroy()"
  req.session.destroy();
  res.redirect('/')
};
