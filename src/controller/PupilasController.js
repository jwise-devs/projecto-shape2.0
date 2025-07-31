const Pupilas = require("../model/Pupilas");
const { Op } = require('sequelize');  // Importa o operador Op do Sequelize
const Usuario = require('../model/Usuario');
const ConsultaEmCasa = require('../model/ConsultaEmCasa');

exports.index = async (req, res) => {
    try {
        // Verificar se há um valor de pesquisa
        const searchQuery = req.query.search || '';  // Pega o valor do campo de pesquisa

        const usuario = await Usuario.findOne({
            where: {
                id: res.locals.user.id,
                role: {
                    [Op.or]: ['admin', 'desk']
                }
            }
        });

        // Fazer a busca filtrada no banco de dados
        const pupilas = await Pupilas.findAll({
            where: {
                [Op.or]: [
                    { nome: { [Op.like]: `%${searchQuery}%` } },
                    { sobrenome: { [Op.like]: `%${searchQuery}%` } },
                    { numeroCelular: { [Op.like]: `%${searchQuery}%` } },
                    { endereco: { [Op.like]: `%${searchQuery}%` } }
                ]
            }
        });

        // Renderizar a página com os usuários encontrados
        res.render('pupilas', { pupilas, usuario });
        return;

    } catch (error) {
        console.error('Erro ao buscar pupilas:', error);
        req.flash('error', 'Erro ao carregar os pupilas.');
        return res.redirect('back');
    }
};

exports.createIndex = async (req, res) => {
    try {
        const pupilas = req.params.pupilas;
        res.render('registro', { pupilas });
        return;

    } catch (error) {
        console.error('Erro ao buscar tratamentos:', error);
        req.flash('error', 'Erro ao carregar os tratamentos.');
        return res.redirect('back');
    }
};

exports.editIndex = async (req, res) => {
    try {
        const pupilaId = req.params.id;
        const pupila = await Pupilas.findOne({ where: { id: pupilaId } });
        res.render('criaPupila', { pupila });
        return;

    } catch (error) {
        console.error('Erro ao buscar pupila:', error);
        req.flash('error', 'Erro ao carregar os pupila.');
        return res.redirect('back');
    }
};

exports.edit = async (req, res) => {
    try {
        const { nome, sobrenome, telefone, endereco, fotoPupila } = req.body;

        // Busca pupila existente
        const pupila = await Pupilas.findByPk(req.params.id);
        if (!pupila) {
            req.flash('error', 'Pupila não encontrada.');
            return res.redirect('/funcionarios');
        }

        // Atualiza os dados
        await Pupilas.update({
            nome,
            sobrenome,
            numeroCelular: telefone,
            endereco,
            fotoPupila,
        }, {
            where: { id: req.params.id }
        });

        req.flash('success', "Pupila editada com sucesso");
        req.session.save(() => res.redirect('/funcionarios'));
    } catch (error) {
        console.error('Erro ao editar pupila:', error);
        req.flash('error', 'Erro ao editar pupila.');
        res.redirect('back');
    }
};

exports.delete = async (req, res) => {
    try {
        const pupilaId = req.params.id;
        const pupila = await Pupilas.destroy({ where: { id: pupilaId } });
        if (!pupila) {
            return res.render("404");
        }

        req.flash('success', "Pupila apagada com sucesso");
        req.session.save(() => res.redirect('back'));
        return;
    } catch (error) {
        console.error('Erro ao apagar pupila:', error);
        req.flash('error', 'Erro ao apagar pupila.');
        res.redirect('back');
    }
};

exports.historico = async (req, res) => {
    try {
        const pupilaId = req.params.id;

        const pupila = await Pupilas.findOne({
            where: { id: pupilaId },
            attributes: ['id', 'nome', 'numeroCelular','endereco','created_at', 'fotoPupila']
        });

        let consultaemcasa = await ConsultaEmCasa.findAll({
            where: { pupilaId },
            attributes: ['id', 'nome', 'sobrenome', 'tratamentosArray', 'data_hora_consulta']
        });

        // Garantir que tratamentosArray é sempre array
        consultaemcasa = consultaemcasa.map(sessao => {
            if (typeof sessao.tratamentosArray === 'string') {
                try {
                    sessao.tratamentosArray = JSON.parse(sessao.tratamentosArray);
                } catch {
                    sessao.tratamentosArray = [];
                }
            } else if (!Array.isArray(sessao.tratamentosArray)) {
                sessao.tratamentosArray = [];
            }
            return sessao;
        });

        // Agrupar por mês (chave "Mês-Ano")
        const mesesMap = {};

        consultaemcasa.forEach(sessao => {
            const data = new Date(sessao.data_hora_consulta);
            const mes = data.toLocaleString('pt-BR', { month: 'long' });
            const chave = `${mes}-${data.getFullYear()}`;

            if (!mesesMap[chave]) {
                mesesMap[chave] = [];
            }
            mesesMap[chave].push(sessao);
        });

        return res.render('historicoPupilas', {
            pupila,
            sessoesPorMes: mesesMap
        });

    } catch (error) {
        console.error('Erro ao buscar tratamentos:', error);
        req.flash('error', 'Erro ao carregar os tratamentos.');
        return res.redirect('back');
    }
};
