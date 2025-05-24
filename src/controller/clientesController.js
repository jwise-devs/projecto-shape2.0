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


// exports.data = async (req, res) => {
//     try {
//         // Receber os dados do formulário
//         const { pacote, subpacote, tratamentos, data_hora_consulta } = req.body;

//         // Verificar se a data e hora da consulta foi fornecida
//         if (!data_hora_consulta) {
//             req.flash('error', 'Por favor, forneça a data e hora da consulta.');
//             return res.redirect('back'); // Redireciona para trás (na mesma página)
//         }

//         console.log(data_hora_consulta)

//         // Converter os preços recebidos para um array de números com duas casas decimais
//         const precosTratamentos = JSON.parse(req.body.preco_tratamentos).map(price => parseFloat(price.toFixed(2)));

//         // Se tratamentos for uma string, converta-a para um array
//         const tratamentosJSON = Array.isArray(tratamentos) ? tratamentos : [tratamentos];

//         // Obter o ID do usuário logado (da variável global res.locals.user)
//         const usuarioId = res.locals.user.id;

//         // Criar a sessão no banco de dados
//         const sessao = await Sessao.create({
//             pacote,
//             subpacote,
//             tratamentos: tratamentosJSON, // Salvar os nomes dos tratamentos na Sessao
//             data_hora_consulta,
//         });

//         // Verificar se já existe um tratamento para este usuário e sessão
//         let tratamentoExistente = await Tratamentos.findOne({
//             where: {
//                 userId: usuarioId,
//                 sessaoId: sessao.id
//             }
//         });

//         const totalPreco = precosTratamentos.reduce((acc, curr) => acc + curr, 0).toFixed(2); // Soma dos preços

//         if (tratamentoExistente) {
//             // Se já existir um tratamento, atualiza o preço somando o novo valor
//             await tratamentoExistente.update({
//                 preco: (parseFloat(tratamentoExistente.preco) + parseFloat(totalPreco)).toFixed(2)
//             });
//         } else {
//             // Se não existir, cria um novo
//             await Tratamentos.create({
//                 userId: usuarioId,
//                 sessaoId: sessao.id,
//                 preco: totalPreco, // Salvar o total dos preços
//                 status: 'marcado',
//             });
//         }

//         // Mensagem de sucesso e redirecionamento
//         req.flash('success', 'Sessão e tratamentos registrados com sucesso!');
//         req.session.save(() => {
//             return res.redirect('/dashboard');
//         });

//     } catch (error) {
//         console.error(error);
//         // Captura erros de validação do Sequelize
//         if (error.errors) {
//             const mensagens = error.errors.map((err) => err.message);
//             req.flash('error', mensagens); // Define mensagens de erro no flash
//         } else {
//             req.flash('error', 'Erro inesperado. Tente novamente!');
//         }

//         // Redireciona de volta para a página de registro
//         req.session.save(function () {
//             return res.redirect('back');
//         });
//     }
// }

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
        const userId = req.params.id || res.locals.user.id;

        const usuario = await Usuario.findOne({
            where: { id: userId }
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



