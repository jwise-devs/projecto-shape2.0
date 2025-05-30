const Pupilas = require("../model/Pupilas");
const { Op } = require('sequelize');  // Importa o operador Op do Sequelize
const Usuario = require('../model/Usuario');

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
}

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
}


exports.editIndex = async (req, res) => {
    try {

        const pupilaId = req.params.id;
        const pupila = await Pupilas.findOne({ where: { id: pupilaId } })
        res.render('criaPupila', { pupila });
        return;


    } catch (error) {
        console.error('Erro ao buscar pupila:', error);
        req.flash('error', 'Erro ao carregar os pupila.');
        return res.redirect('back');
    }
}

exports.edit = async (req, res) => {
    try {
        const { nome, sobrenome, telefone, endereco } = req.body;

        // Busca pupila existente
        const pupila = await Pupilas.findByPk(req.params.id);
        if (!pupila) {
            req.flash('error', 'Pupila não encontrada.');
            return res.redirect('/funcionarios');
        }

        // Mantém a foto antiga se nenhuma nova for enviada
        const fotoPupila = req.file ? `/uploads/images/${req.file.filename}` : pupila.fotoPupila;

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
    const pupilaId = req.params.id;
    const pupila = await Pupilas.destroy({ where: { id: pupilaId } })
    if (!pupila) return res.render("404");


    req.flash('success', "Pupila apagada com sucesso");
    req.session.save(() => res.redirect(`back`));
    return;
}