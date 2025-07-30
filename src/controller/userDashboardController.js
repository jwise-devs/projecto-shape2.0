const Sessao = require('../model/Sessao');


exports.index = async (req, res) => {
    try {
        // Buscar todas as sessões do usuário logado
        const sessoes = await Sessao.findAll({
            where: { userId: res.locals.user.id }, // Filtra pelo usuário logado
            attributes: ['id', 'pacote', 'subpacote', 'data_hora_consulta', 'precoSessao', 'status', 'tratamentosArray','status'], // Campos necessários
        });

        // Renderizar a view e enviar os dados
        res.render('userDashboard', { sessoes });
    } catch (error) {
        console.error('Erro ao buscar sessões:', error);
        req.flash('error', 'Erro ao carregar as sessões.');
        return res.redirect('back');
    }
};

exports.cancelar = async (req, res) => {

    try {

        const sessaoId = req.params.id;
        await Sessao.update({ status: 'Cancelado' }, { where: { id: sessaoId } });
        req.flash('success', 'Consulta cancelada com sucesso!');
         // Redirecionar para onde quiser (ex: para o dashboard)
        return res.redirect('/dashboard');

    } catch (error) {
        console.error('Erro ao buscar sessões:', error);
        req.flash('error', 'Erro ao carregar as sessões.');
        return res.redirect('back');
    }


}

