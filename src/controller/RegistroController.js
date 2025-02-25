const Usuario = require('../model/Usuario');
const Ficha_De_Dados = require('../model/Ficha_De_Dados');

exports.index = (req, res) => {
  res.render('registro'); // Página de registro
};

exports.register = async (req, res) => {
  try {
    if (!req.body.email || !req.body.password) {
      req.flash('error', 'Por favor, preencha todos os campos.');
      return req.session.save(() => res.redirect('back'));
    }
    // Tenta criar o novo usuário
    const novoUsuario = await Usuario.create(req.body);

    const role = await Usuario.findAll({ where: { role: 'usuario' } });

    //Cria a ficha de dados associada ao usuário, com valores iniciais ou vazios
    console.log('ID do novo usuário:', novoUsuario.id);

    console.log(role);

    await Ficha_De_Dados.create({
      userId: novoUsuario.id, // Associa o ID do usuário
      // Dados iniciais vazios ou default, você pode preencher conforme necessário
      cintura_umbilical: '',
      acima_umbigo: '',
      abaixo_umbigo: '',
      alimentacao: '',
      consumo_agua: '',
      historico_doencas: '',
      idade: '>10', 
      formulario_preenchido: false,// Exemplo de valor default
      // Outros campos da ficha, com valores iniciais vazios ou padrões
    });


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
