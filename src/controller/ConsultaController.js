const ficha_de_dados = require('../model/Ficha_De_Dados');

exports.index = async (req,res) => {
    res.render('agendar');
    return;
}

exports.data = async (req, res) => {
    try {
        const { cintura_umbilical, acima_umbigo,
            abaixo_umbigo,
            alimentacao,
            consumo_agua,
            historico_doencas,
            queixa_principal,
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
            alguma_alergia } = req.body;

        if (diabetes === 'sim') {
            if (!abaixo_umbigo || !acima_umbigo || !alguma_alergia || !alimentacao || !alteracoes_cardiacas || !ciclo_menstrual_regular || !cintura_umbilical || !consumo_agua || !diabete_controlada || !diabetes || !disturbio_circulatorio || !disturbio_hormonal || !disturbio_renal || !epiletica || !fumante || !funcionamento_intestional_regular || !hipo || !historico_doencas || !idade || !queixa_principal || !tipo_diabetes || !tratamento_medico) {
                req.flash('error', 'Por favor, preencha todos os campos.');
                return req.session.save(() => res.redirect('back'));
            }

            const dados = await ficha_de_dados.create(req.body);

            // Flash message de sucesso
            req.flash('success', 'Usuário registrado com sucesso!');
            req.session.save(function () {

                return res.redirect('/sessao'); // Redireciona para o dashboard
            });

        } else {
            if (!abaixo_umbigo || !acima_umbigo || !alguma_alergia || !alimentacao || !alteracoes_cardiacas || !ciclo_menstrual_regular || !cintura_umbilical || !consumo_agua || !diabetes || !disturbio_circulatorio || !disturbio_hormonal || !disturbio_renal || !epiletica || !fumante || !funcionamento_intestional_regular || !hipo || !historico_doencas || !idade || !queixa_principal || !tratamento_medico) {
                req.flash('error', 'Por favor, preencha todos os campos.');
                return req.session.save(() => res.redirect('back'));
            }

            const dados = await ficha_de_dados.create(req.body);

            // Flash message de sucesso
            req.flash('success', 'Usuário registrado com sucesso!');
            req.session.save(function () {

                return res.redirect('/sessao'); // Redireciona para o dashboard
            });
        }
       
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
}