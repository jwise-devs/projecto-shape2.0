const Ficha_De_Dados = require('../model/Ficha_De_Dados');
const Usuario = require('../model/Usuario');

exports.index = async (req, res) => {
  const userId = req.session.user.id;

  const usuario = await Usuario.findOne({
    where: { id: userId },
    attributes: ['id', 'nome', 'created_at', 'role', 'sexo']
  });

  res.render('agendar', { usuario });
  return;
}

exports.data = async (req, res) => {
  try {
    const { cintura_umbilical, acima_umbigo, abaixo_umbigo, alimentacao, consumo_agua, historico_doencas, queixa_principal, idade, fumante, disturbio_circulatorio, epiletica, ciclo_menstrual_regular, funcionamento_intestional_regular, tratamento_medico, diabetes, tipo_diabetes, diabete_controlada, alteracoes_cardiacas, disturbio_hormonal, hipo, disturbio_renal, alguma_alergia } = req.body;

    const userId = req.session.user.id;

    const usuario = await Usuario.findOne({
      where: { id: userId },
      attributes: ['id', 'nome', 'created_at', 'role', 'sexo']
    });

    if (usuario.sexo === 'F') {
      // Valida se os campos necessários foram preenchidos (para diabéticos ou não)
      if (diabetes === 'sim') {
        if (!abaixo_umbigo || !acima_umbigo || !alguma_alergia || !alimentacao || !alteracoes_cardiacas || !ciclo_menstrual_regular || !cintura_umbilical || !consumo_agua || !diabete_controlada || !diabetes || !disturbio_circulatorio || !disturbio_hormonal || !disturbio_renal || !epiletica || !fumante || !funcionamento_intestional_regular || !hipo || !historico_doencas || !idade || !queixa_principal || !tipo_diabetes || !tratamento_medico) {
          req.flash('error', 'Por favor, preencha todos os campos.');
          return req.session.save(() => res.redirect('back'));
        }
      } else {
        if (!abaixo_umbigo || !acima_umbigo || !alguma_alergia || !alimentacao || !alteracoes_cardiacas || !ciclo_menstrual_regular || !cintura_umbilical || !consumo_agua || !diabetes || !disturbio_circulatorio || !disturbio_hormonal || !disturbio_renal || !epiletica || !fumante || !funcionamento_intestional_regular || !hipo || !historico_doencas || !idade || !queixa_principal || !tratamento_medico) {
          req.flash('error', 'Por favor, preencha todos os campos.');
          return req.session.save(() => res.redirect('back'));
        }
      }
    } else {
      // Valida se os campos necessários foram preenchidos (para diabéticos ou não)
      if (diabetes === 'sim') {
        if (!abaixo_umbigo || !acima_umbigo || !alguma_alergia || !alimentacao || !alteracoes_cardiacas || !cintura_umbilical || !consumo_agua || !diabete_controlada || !diabetes || !disturbio_circulatorio || !disturbio_hormonal || !disturbio_renal || !epiletica || !fumante || !funcionamento_intestional_regular || !hipo || !historico_doencas || !idade || !queixa_principal || !tipo_diabetes || !tratamento_medico) {
          req.flash('error', 'Por favor, preencha todos os campos.');
          return req.session.save(() => res.redirect('back'));
        }
      } else {
        if (!abaixo_umbigo || !acima_umbigo || !alguma_alergia || !alimentacao || !alteracoes_cardiacas || !cintura_umbilical || !consumo_agua || !diabetes || !disturbio_circulatorio || !disturbio_hormonal || !disturbio_renal || !epiletica || !fumante || !funcionamento_intestional_regular || !hipo || !historico_doencas || !idade || !queixa_principal || !tratamento_medico) {
          req.flash('error', 'Por favor, preencha todos os campos.');
          return req.session.save(() => res.redirect('back'));
        }
      }
    }







    // Criando e salvando a ficha de dados
    const ficha = await Ficha_De_Dados.update({
      cintura_umbilical,
      acima_umbigo,
      abaixo_umbigo,
      alimentacao,
      consumo_agua,
      historico_doencas,
      idade,
      fumante,
      disturbio_circulatorio,
      epiletica,
      ciclo_menstrual_regular,
      funcionamento_intestional_regular,
      tratamento_medico,
      diabetes,
      tipo_diabetes,
      diabete_controlada,
      alteracoes_cardiacas,
      disturbio_hormonal,
      hipo,
      disturbio_renal,
      alguma_alergia,
      queixa_principal,
      formulario_preenchido: true,
    },
      {
        where: { userId },
      }
    );

    req.flash('success', 'Ficha preenchida com sucesso!');
    req.session.save(function () {
      return res.redirect('/sessao'); // Redireciona para o dashboard
    });

  } catch (error) {
    if (error.errors) {
      const mensagens = error.errors.map((err) => err.message);
      req.flash('error', mensagens); // Mensagens de erro do Sequelize
    } else {
      req.flash('error', 'Erro inesperado. Tente novamente!');
    }

    req.session.save(function () {
      return res.redirect('/agendar'); // Redireciona de volta para a página de preenchimento
    });
  }
};

exports.cliente = async (req, res) => {
  const usuarioId = req.params.id;
  const usuario = await Usuario.findOne({ where: { id: usuarioId } })
  res.render('agendar', { usuario });
  return;
}

exports.dataCliente = async (req, res) => {
  try {
    const { cintura_umbilical, acima_umbigo, abaixo_umbigo, alimentacao, consumo_agua, historico_doencas, queixa_principal, idade, fumante, disturbio_circulatorio, epiletica, ciclo_menstrual_regular, funcionamento_intestional_regular, tratamento_medico, diabetes, tipo_diabetes, diabete_controlada, alteracoes_cardiacas, disturbio_hormonal, hipo, disturbio_renal, alguma_alergia } = req.body;


    // Valida se os campos necessários foram preenchidos (para diabéticos ou não)
    if (diabetes === 'sim') {
      if (!abaixo_umbigo || !acima_umbigo || !alguma_alergia || !alimentacao || !alteracoes_cardiacas || !ciclo_menstrual_regular || !cintura_umbilical || !consumo_agua || !diabete_controlada || !diabetes || !disturbio_circulatorio || !disturbio_hormonal || !disturbio_renal || !epiletica || !fumante || !funcionamento_intestional_regular || !hipo || !historico_doencas || !idade || !queixa_principal || !tipo_diabetes || !tratamento_medico) {
        req.flash('error', 'Por favor, preencha todos os campos.');
        return req.session.save(() => res.redirect('back'));
      }
    } else {
      if (!abaixo_umbigo || !acima_umbigo || !alguma_alergia || !alimentacao || !alteracoes_cardiacas || !ciclo_menstrual_regular || !cintura_umbilical || !consumo_agua || !diabetes || !disturbio_circulatorio || !disturbio_hormonal || !disturbio_renal || !epiletica || !fumante || !funcionamento_intestional_regular || !hipo || !historico_doencas || !idade || !queixa_principal || !tratamento_medico) {
        req.flash('error', 'Por favor, preencha todos os campos.');
        return req.session.save(() => res.redirect('back'));
      }
    }

    const userId = req.params.usuarioId;

    // Criando e salvando a ficha de dados
    const ficha = await Ficha_De_Dados.update({
      cintura_umbilical,
      acima_umbigo,
      abaixo_umbigo,
      alimentacao,
      consumo_agua,
      historico_doencas,
      idade,
      fumante,
      disturbio_circulatorio,
      epiletica,
      ciclo_menstrual_regular,
      funcionamento_intestional_regular,
      tratamento_medico,
      diabetes,
      tipo_diabetes,
      diabete_controlada,
      alteracoes_cardiacas,
      disturbio_hormonal,
      hipo,
      disturbio_renal,
      alguma_alergia,
      queixa_principal,
      formulario_preenchido: true,
    },
      {
        where: { userId },
      }
    );

    req.flash('success', 'Ficha preenchida com sucesso!');
    req.session.save(function () {
      return res.redirect(`/sessao/novo/${userId}`); // Redireciona para o dashboard
    });

  } catch (error) {
    if (error.errors) {
      const mensagens = error.errors.map((err) => err.message);
      req.flash('error', mensagens); // Mensagens de erro do Sequelize
    } else {
      req.flash('error', 'Erro inesperado. Tente novamente!');
    }

    req.session.save(function () {
      return res.redirect('/agendar'); // Redireciona de volta para a página de preenchimento
    });
  }
};
