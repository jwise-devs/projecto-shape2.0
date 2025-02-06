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
        const { pacote, subpacote, tratamentos, data_hora_consulta, preco_tratamentos } = req.body;

        // Se tratamentos for uma string, converta-a para um array
        const tratamentosJSON = Array.isArray(tratamentos) ? tratamentos : [tratamentos];

        // Dividir o preço em um array para associar a cada tratamento
        const precosTratamentos = preco_tratamentos.split(',').map(price => parseFloat(price.trim()));

        // Obter o ID do usuário logado (da variável global res.locals.user)
        const usuarioId = res.locals.user.id;
        console.log('User ID:', usuarioId); // Verifica se o ID está correto

        // Criar a sessão no banco de dados
        const sessao = await Sessao.create({
            pacote,
            subpacote,
            tratamentos: tratamentosJSON, // Salvar os nomes dos tratamentos na Sessao
            data_hora_consulta,
        });

        console.log('Sessao ID:', sessao.id);

        // Inserir os tratamentos na tabela intermediária (Tratamentos) associando o usuário logado
        for (let i = 0; i < tratamentosJSON.length; i++) {
            // Verificar se o tratamento já foi inserido para o mesmo usuário e a mesma sessão
            const existingTratamento = await Tratamentos.findOne({
                where: {
                    userId: usuarioId,
                    sessaoId: sessao.id,
                }
            });

            // Se o tratamento não existir, então insira-o
            if (!existingTratamento) {
                await Tratamentos.create({
                    userId: usuarioId,              // ID do usuário logado
                    sessaoId: sessao.id,            // ID da sessão recém-criada
                    preco: precosTratamentos[i],    // Preço do tratamento
                    status: 'marcado',              // Status padrão
                });
            }
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
