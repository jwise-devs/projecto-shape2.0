const Pupilas = require('../model/Pupilas');
const Usuario = require('../model/Usuario');


const { Op } = require("sequelize");


exports.index = async (req, res) => {
  const usuario = await Usuario.findOne({where:{role:'admin',id: res.locals.user.id}});
  res.render('criaPupila', {usuario});
};

exports.create = async (req, res) => {
  try {

    const { nome, sobrenome, telefone, endereco  } = req.body;

     const fotoPath = req.file ? `/uploads/images/${req.file.filename}` : null;
    

    if (!nome || !sobrenome || !telefone || !endereco) {
      req.flash('error', 'Por favor, preenche os campos:');
      return req.session.save(() => res.redirect('back'));
    }


    const pupilas = await Pupilas.create({
      nome: nome,
      sobrenome: sobrenome,
      numeroCelular: telefone,
      endereco: endereco,
      fotoPupila: fotoPath // salva o caminho no banco
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
