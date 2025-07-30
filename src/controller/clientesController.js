const Usuario = require("../model/Usuario");
const { Op } = require('sequelize');  // Importa o operador Op do Sequelize
const Sessao = require('../model/Sessao');
const Foto = require('../model/Foto'); // ajuste o caminho conforme sua estrutura


exports.index = async (req, res) => {
    try {
        // Verificar se há um valor de pesquisa
        const searchQuery = req.query.search || '';  // Pega o valor do campo de pesquisa

        // Fazer a busca filtrada no banco de dados
        const usuarios = await Usuario.findAll({
            where: {
                role: 'usuario',
                [Op.or]: [
                    { nome: { [Op.like]: `%${searchQuery}%` } },
                    { email: { [Op.like]: `%${searchQuery}%` } },
                    { telefone: { [Op.like]: `%${searchQuery}%` } }
                ]
            }
        });

        // Renderizar a página com os usuários encontrados
        res.render('clientes', { usuarios });
        return;

    } catch (error) {
        console.error('Erro ao buscar clientes:', error);
        req.flash('error', 'Erro ao carregar os clientes.');
        return res.redirect('back');
    }
}



exports.editIndex = async (req, res) => {
    try {

        const userId = req.params.id;
        const usuario = await Usuario.findOne({ where: { id: userId } })
        res.render('registro', { usuario });
        return;


    } catch (error) {
        console.error('Erro ao buscar tratamentos:', error);
        req.flash('error', 'Erro ao carregar os tratamentos.');
        return res.redirect('back');
    }
}

exports.edit = async (req, res) => {

    try {

        const { nome, email, telefone } = req.body; // Pega os dados do formulário de login
        const atualizacao = await Usuario.update({
            nome,
            email,
            telefone,
        },
            {
                where: { id: req.params.id }
            }
        )

        req.flash('success', "Cliente editado com sucesso");
        req.session.save(() => res.redirect('/clientes'));
        return;

    } catch (error) {
        console.error('Erro ao buscar tratamentos:', error);
        req.flash('error', 'Erro ao carregar os tratamentos.');
        return res.redirect('back');
    }


}

exports.delete = async (req, res) => {
    const userId = req.params.id;
    const usuario = await Usuario.destroy({ where: { id: userId } })
    if (!usuario) return res.render("404");


    req.flash('success', "Contacto apagado com sucesso");
    req.session.save(() => res.redirect(`back`));
    return;
}

exports.historico = async (req, res) => {
    try {
        const userId = req.params.id;

        const usuario = await Usuario.findOne({
            where: { id: res.locals.user.id },
            attributes: ['id', 'nome', 'created_at', 'role'] // <-- role adicionado aqui
        });


        const sessoes = await Sessao.findAll({
            where: { userId },
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

        // Carrega todas as fotos associadas a sessões desse usuário
        const fotos = await Foto.findAll({
            where: {
                sessaoId: sessoes.map(s => s.id)
            },
            attributes: ['sessaoId', 'tipo', 'filename']
        });

        const agora = new Date();

        const pendentes = [];
        const concluidas = [];
        const marcadas = [];

        sessoes.forEach(sessao => {
            const dataConsulta = new Date(sessao.data_hora_consulta);
            const tresMesesDepois = new Date(dataConsulta);
            tresMesesDepois.setMonth(dataConsulta.getMonth() + 3);

            if (agora >= tresMesesDepois) {
                sessao.status = 'Concluído';
                concluidas.push(sessao);
            } else if (agora >= dataConsulta && agora < tresMesesDepois) {
                sessao.status = 'Pendente';
                pendentes.push(sessao);
            } else {
                sessao.status = 'Marcado';
                marcadas.push(sessao);
            }
        });

        console.log('ROLE:', usuario.role);


        return res.render('historico', {
            usuario,
            pendentes,
            concluidas,
            marcadas,
            fotos, // envia para a view
            role: usuario.role,
        });

    } catch (error) {
        console.error('Erro ao buscar tratamentos:', error);
        req.flash('error', 'Erro ao carregar os tratamentos.');
        return res.redirect('back');
    }
};



