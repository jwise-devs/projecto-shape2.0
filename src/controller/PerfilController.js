const Sessao = require('../model/Sessao');

exports.index = async (req, res) => {
    try {
        const sessoes = await Sessao.findAll({
            where: { userId: res.locals.user.id },
            attributes: [
                'id',
                'pacote',
                'subpacote',
                'data_hora_consulta',
                'precoSessao',
                'status',
                'tratamentosArray'
            ],
        });

        const agora = new Date();

        // Atualizar status dinamicamente (sem salvar no banco)
        sessoes.forEach(sessao => {
            const dataConsulta = new Date(sessao.data_hora_consulta);
            const tresMesesDepois = new Date(dataConsulta);
            tresMesesDepois.setMonth(dataConsulta.getMonth() + 3);

            if (agora >= tresMesesDepois) {
                sessao.status = 'Concluído';
            } else if (
                agora.toDateString() === dataConsulta.toDateString()
            ) {
                sessao.status = 'Pendente';
            }
            // else permanece como "Marcado" ou o status original
        });

        res.render('perfil', {
            sessoes,
            user: res.locals.user
        });

    } catch (error) {
        console.error('Erro ao buscar sessões:', error);
        req.flash('error', 'Erro ao carregar as sessões.');
        return res.redirect('back');
    }
};
