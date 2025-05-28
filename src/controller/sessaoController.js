const Sessao = require('../model/Sessao');
const Tratamentos = require('../model/Tratamentos');
const { Op } = require('sequelize');

exports.index = async (req, res) => {
    try {
        // Buscar tratamentos sem pacote "consulta_em_casa"
        const tratamentosData = await Tratamentos.findAll({
            where: { pacote: { [Op.ne]: 'consulta_em_casa' } }
        });
        const tratamentos = tratamentosData.map(t => t.get({ plain: true }));

        const pacotes = [...new Set(tratamentos.map(t => t.pacote))];

        res.render('sessao', { tratamentos, pacotes, csrfToken: req.csrfToken() });
    } catch (error) {
        console.error(error);
        req.flash('error', 'Erro ao carregar tratamentos.');
        return res.redirect('back');
    }
};

exports.data = async (req, res) => {
    try {
        const { pacote, subpacote, tratamentos, data_hora_consulta } = req.body;

        if (!data_hora_consulta) {
            req.flash('error', 'Por favor, forneça a data e hora da consulta.');
            return res.redirect('back');
        }

        const precosTratamentos = JSON.parse(req.body.preco_tratamentos).map(p => parseFloat(p));
        const tratamentosJSON = Array.isArray(tratamentos) ? tratamentos : [tratamentos];

        const usuarioId = res.locals.user.id;

        const totalPreco = precosTratamentos.reduce((a, b) => a + b, 0).toFixed(2);

        const sessoesAnteriores = await Sessao.findAll({ where: { userId: usuarioId } });
        const totalTratamentosAnteriores = sessoesAnteriores.reduce((acc, sessao) => acc + (sessao.tratamentosArray?.length || 0), 0);
        const totalSessao = Number(totalTratamentosAnteriores) + tratamentosJSON.length;

        const sessao = await Sessao.create({
            pacote,
            subpacote,
            tratamentosArray: tratamentosJSON,
            data_hora_consulta,
            userId: usuarioId,
            precoSessao: totalPreco,
            numTotSessao: tratamentosJSON.length,
            status: 'marcado',
        });

        req.flash('success', 'Sessão e tratamentos registrados com sucesso!');
        req.session.save(() => res.redirect('/dashboard'));
    } catch (error) {
        console.error(error);
        if (error.errors) {
            const mensagens = error.errors.map(err => err.message);
            req.flash('error', mensagens);
        } else {
            req.flash('error', 'Erro inesperado. Tente novamente!');
        }
        req.session.save(() => res.redirect('back'));
    }
};

// --- Função para desk manager criar sessão para outro usuário ---
exports.novaSessao = async (req, res) => {
    try {
        const usuarioId = req.params.usuarioId;
        // Buscar tratamentos normalmente
        const tratamentosData = await Tratamentos.findAll({
            where: { pacote: { [Op.ne]: 'consulta_em_casa' } }
        });
        const tratamentos = tratamentosData.map(t => t.get({ plain: true }));

        const pacotes = [...new Set(tratamentos.map(t => t.pacote))];

        res.render('sessao', { tratamentos, pacotes, csrfToken: req.csrfToken(), usuarioId });
    } catch (error) {
        console.error(error);
        req.flash('error', 'Erro ao carregar tratamentos.');
        return res.redirect('back');
    }
};

exports.criarSessaoParaUsuario = async (req, res) => {
    try {
        const usuarioId = req.params.usuarioId;
        const { pacote, subpacote, tratamentos, data_hora_consulta } = req.body;

        if (!data_hora_consulta) {
            req.flash('error', 'Por favor, forneça a data e hora da consulta.');
            return res.redirect('back');
        }

        const precosTratamentos = JSON.parse(req.body.preco_tratamentos).map(p => parseFloat(p));
        const tratamentosJSON = Array.isArray(tratamentos) ? tratamentos : [tratamentos];

        const totalPreco = precosTratamentos.reduce((a, b) => a + b, 0).toFixed(2);

        const sessao = await Sessao.create({
            pacote,
            subpacote,
            tratamentosArray: tratamentosJSON,
            data_hora_consulta,
            userId: usuarioId,
            precoSessao: totalPreco,
            numTotSessao: tratamentosJSON.length,
            status: 'marcado',
        });

        req.flash('success', 'Sessão criada com sucesso para o usuário!');
        req.session.save(() => res.redirect('/clientes')); // redireciona para lista clientes
    } catch (error) {
        console.error(error);
        if (error.errors) {
            const mensagens = error.errors.map(err => err.message);
            req.flash('error', mensagens);
        } else {
            req.flash('error', 'Erro inesperado. Tente novamente!');
        }
        req.session.save(() => res.redirect('back'));
    }
};
