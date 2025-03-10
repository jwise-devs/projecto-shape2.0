const Tratamentos = require("../model/Tratamentos");
const { Op } = require('sequelize');

exports.index = async (req, res) => {
    try {

        const tratamentos = await Tratamentos.findAll({
            where: { sessaoId: null }, // Filtra pelo usuário logado
            attributes: ['id','nome','pacote','subpacote','preco'], // Campos necessários
        });


        res.render('verificarProcedimentos', { tratamentos: tratamentos });

       

    } catch (error) {
        console.error('Erro ao buscar tratamentos:', error);
        req.flash('error', 'Erro ao carregar os tratamentos.');
        return res.redirect('back');
    }
}


exports.search = async (req, res) => {
    try {
        const search = req.query.search;

        const tratamentos = await Tratamentos.findAll({
            where: {
                sessaoId: null,
                [Op.or]: [
                    {
                        nome: {
                            [Op.like]: `%${search}%` // Usando LIKE em vez de ILIKE
                        }
                    },
                    {
                        pacote: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        subpacote: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        preco: {
                            [Op.like]: `%${search}%`
                        }
                    }
                ]
            }
        });

        res.render('verificarProcedimentos', { tratamentos: tratamentos });

    } catch (error) {
        console.error('Erro ao buscar tratamentos:', error);
        req.flash('error', 'Erro ao carregar os tratamentos.');
        return res.redirect('back');
    }
};
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

        const tratamentosId = req.params.id;
        const tratamento = await Tratamentos.findOne({where: {id: tratamentosId}})
        res.render('criarProcedimentos', { tratamento });
        return;


    } catch (error) {
        console.error('Erro ao buscar tratamentos:', error);
        req.flash('error', 'Erro ao carregar os tratamentos.');
        return res.redirect('back');
    }
}

exports.update = async (req, res) => {

    try {

        const { pacote, subpacote, procedimentos, valor } = req.body;
        const precoTrat = parseFloat(valor).toFixed(2);

        if (isNaN(precoTrat)) {
        req.flash('error', 'Por favor, o campo preco tem que ser um numero valido');
        return req.session.save(() => res.redirect('back'));
        }
    
        const atualizacao = await Tratamentos.update({
            nome: procedimentos,
            pacote,
            subpacote,
            preco: precoTrat,
        },
            {
                where : {id: req.params.id}
            }
        )

        req.flash('success', "Procedimento editado com sucesso");
        req.session.save(() => res.redirect('/procedimentos/list'));
        return;

    } catch (error) {
        console.error('Erro ao buscar tratamentos:', error);
        req.flash('error', 'Erro ao carregar os tratamentos.');
        return res.redirect('back');
    }


}

exports.delete = async (req, res) =>{
    const tratamentosId = req.params.id;
    const tratamento = await Tratamentos.destroy({where: {id: tratamentosId}})
    if(!tratamento) return res.render("404");
   

    req.flash('success', "procedimento apagado com sucesso");
    req.session.save(() => res.redirect(`back`));
    return;
}

