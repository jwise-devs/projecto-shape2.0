const Sessao = require('../model/Sessao');
const Tratamentos = require('../model/Tratamentos');


exports.index = async (req, res) => {
    try {
        // Busca os tratamentos do banco de dados
        const tratamentosData = await Tratamentos.findAll();

        // Converte as instâncias para dados puros
        const tratamentos = tratamentosData.map(tratamento => tratamento.get({ plain: true }));

        // Obter os pacotes únicos a partir dos tratamentos (assumindo que o campo pacote existe)
        const pacotes = [...new Set(tratamentos.map(t => t.pacote))];  // Remove pacotes duplicados

        res.render('sessao', { tratamentos: tratamentos, pacotes: pacotes, csrfToken: req.csrfToken() });
    } catch (error) {
        console.error(error);
        req.flash('error', 'Erro ao carregar tratamentos.');
        return res.redirect('back');
    }
};




exports.data = async (req, res) => {
    try {
        // Receber os dados do formulário
        const { pacote, subpacote, tratamentos, data_hora_consulta } = req.body;

        // Verificar se a data e hora da consulta foi fornecida
        if (!data_hora_consulta) {
            req.flash('error', 'Por favor, forneça a data e hora da consulta.');
            return res.redirect('back'); // Redireciona para trás (na mesma página)
        }


        // Converter os preços recebidos para um array de números com duas casas decimais
        const precosTratamentos = JSON.parse(req.body.preco_tratamentos).map(price => parseFloat(price));

        // Se tratamentos for uma string, converta-a para um array
        const tratamentosJSON = Array.isArray(tratamentos) ? tratamentos : [tratamentos];

        // Obter o ID do usuário logado (da variável global res.locals.user)
        const usuarioId = res.locals.user.id;

        // Calcular o preço total
        const totalPreco = precosTratamentos.reduce((acc, curr) => acc + curr, 0).toFixed(2); // Soma dos preços

        // console.log(tratamentosJSON.length);
        const sessoesAnteriores = await Sessao.findAll({ where: { userId: usuarioId } });

        // Soma total de tratamentos já realizados antes
        const totalTratamentosAnteriores = sessoesAnteriores.reduce((acc, sessao) => {
            return acc + (sessao.tratamentosArray?.length || 0);
        }, 0);

        // Total atual incluindo os novos tratamentos
        const totalSessao = Number(totalTratamentosAnteriores) + Number(tratamentosJSON.length);


        console.log("Anterior:", typeof totalTratamentosAnteriores, totalTratamentosAnteriores);
        console.log("Tratamentos novos:", typeof tratamentosJSON.length, tratamentosJSON.length);
        console.log("Total:", totalSessao);


        // Criar a sessão no banco de dados
        const sessao = await Sessao.create({
            pacote,
            subpacote,
            tratamentosArray: tratamentosJSON, // Salvar os nomes dos tratamentos na Sessao
            data_hora_consulta,
            userId: usuarioId, // ID do usuário logado
            precoSessao: totalPreco,
            numTotSessao: tratamentosJSON.length,
            status: 'marcado',
        });

        // await Sessao.update(
        //     { numTotSessao: totalSessao },
        //     { where: { userId: usuarioId } }
        // );





        // // Criar os tratamentos para o usuário
        // await Promise.all(tratamentosJSON.map(async (tratamentoNome) => {
        //     // Verificar se o tratamento já foi registrado
        //     let tratamentoExistente = await Tratamentos.findOne({
        //         where: {
        //             userId: usuarioId,
        //             nome: tratamentoNome
        //         }
        //     });

        //     if (tratamentoExistente) {
        //         // Se já existir um tratamento, atualiza o preço somando o novo valor
        //         await tratamentoExistente.update({
        //             preco: (parseFloat(tratamentoExistente.preco) + parseFloat(totalPreco)).toFixed(2)
        //         });
        //     } else {
        //         // Se não existir, cria um novo
        //         await Tratamentos.create({
        //             userId: usuarioId,
        //             nome: tratamentoNome, // Nome do tratamento
        //             pacote,
        //             subpacote,
        //             preco: totalPreco, // Salvar o total dos preços
        //             status: 'marcado',
        //         });
        //     }
        // }));

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
};
