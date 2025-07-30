const Sessao = require('../model/Sessao');
const { Op } = require('sequelize');

exports.index = async (req, res) => {
    try {
        // Buscar todas as sessões do usuário
        const todasSessoes = await Sessao.findAll({
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

        // Atualizar os status no banco de dados
        for (const sessao of todasSessoes) {
            const dataConsulta = new Date(sessao.data_hora_consulta);
            const tresMesesDepois = new Date(dataConsulta);
            tresMesesDepois.setMonth(dataConsulta.getMonth() + 3);

            // Normalizar data para comparação (apenas ano, mês, dia)
            const hoje = new Date();
            const dataAtual = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate());
            const dataConsultaNormalizada = new Date(
                dataConsulta.getFullYear(),
                dataConsulta.getMonth(),
                dataConsulta.getDate()
            );

            // Se for consulta em casa e a data for hoje, marcar como Concluído
            if (
                sessao.pacote === 'consulta_em_casa' &&
                dataAtual.getTime() === dataConsultaNormalizada.getTime()
            ) {
                await sessao.update({ status: 'Concluído' });
            }

            if (agora >= tresMesesDepois && sessao.status !== 'Concluído') {
                await sessao.update({ status: 'Concluído' });
            } else if (
                agora >= dataConsulta &&
                agora < tresMesesDepois &&
                sessao.status !== 'Pendente'
            ) {
                await sessao.update({ status: 'Pendente' });
            }
        }

        // Buscar novamente, agora só as sessões que não estão concluídas
        const sessoes = await Sessao.findAll({
            where: {
                userId: res.locals.user.id,
                status: {
                    [Op.ne]: 'Concluído'
                }
            },
            attributes: [
                'id',
                'pacote',
                'subpacote',
                'data_hora_consulta',
                'precoSessao',
                'status',
                'tratamentosArray'
            ]
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
