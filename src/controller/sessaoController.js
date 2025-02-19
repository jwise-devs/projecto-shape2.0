const Sessao = require('../model/Sessao'); 
const Tratamentos = require('../model/Tratamentos');
const Usuario = require("../model/Usuario");

exports.index = async (req, res) => {
    res.render('sessao');
    return;
}

exports.data = async (req, res) => {
    try {
        // Receber os dados do formulário
        const { pacote, subpacote, tratamentos, data_hora_consulta } = req.body;

        // Verificar se a data e hora da consulta foi fornecida
        if (!data_hora_consulta) {
            req.flash('error', 'Por favor, forneça a data e hora da consulta.');
            return res.redirect('back'); // Redireciona para trás (na mesma página)
        }

        console.log(data_hora_consulta)

        // Converter os preços recebidos para um array de números com duas casas decimais
        const precosTratamentos = JSON.parse(req.body.preco_tratamentos).map(price => parseFloat(price.toFixed(2)));

        // Se tratamentos for uma string, converta-a para um array
        const tratamentosJSON = Array.isArray(tratamentos) ? tratamentos : [tratamentos];

        // Obter o ID do usuário logado (da variável global res.locals.user)
        const usuarioId = res.locals.user.id;

        // Criar a sessão no banco de dados
        const sessao = await Sessao.create({
            pacote,
            subpacote,
            tratamentos: tratamentosJSON, // Salvar os nomes dos tratamentos na Sessao
            data_hora_consulta,
        });

        // Verificar se já existe um tratamento para este usuário e sessão
        let tratamentoExistente = await Tratamentos.findOne({
            where: {
                userId: usuarioId,
                sessaoId: sessao.id
            }
        });

        const totalPreco = precosTratamentos.reduce((acc, curr) => acc + curr, 0).toFixed(2); // Soma dos preços

        if (tratamentoExistente) {
            // Se já existir um tratamento, atualiza o preço somando o novo valor
            await tratamentoExistente.update({
                preco: (parseFloat(tratamentoExistente.preco) + parseFloat(totalPreco)).toFixed(2)
            });
        } else {
            // Se não existir, cria um novo
            await Tratamentos.create({
                userId: usuarioId,
                sessaoId: sessao.id,
                preco: totalPreco, // Salvar o total dos preços
                status: 'marcado',
            });
        }

        // Mensagem de sucesso e redirecionamento
        req.flash('success', 'Sessão e tratamentos registrados com sucesso!');
        req.session.save(() => {
            return res.redirect('/dashboard');
        });

    } catch (error) {
        console.error(error);
        // Captura erros de validação do Sequelize
        if (error.errors) {
            const mensagens = error.errors.map((err) => err.message);
            req.flash('error', mensagens); // Define mensagens de erro no flash
        } else {
            req.flash('error', 'Erro inesperado. Tente novamente!');
        }

        // Redireciona de volta para a página de registro
        req.session.save(function () {
            return res.redirect('back');
        });
    }
}

