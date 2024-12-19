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

         // Se tratamentos for uma string, converta-a para um array
        // Isso garante que tratamentos seja sempre um array de strings
        const tratamentosJSON = Array.isArray(tratamentos) ? tratamentos : [tratamentos];

        // Obter o ID do usuário logado (da variável global res.locals.user)
        const usuaioId = res.locals.user.id;
        console.log('User ID:', userId); // Verifica se o ID está correto

       
        
        // Criar a sessão no banco de dados
        const sessao = await Sessao.create({
            pacote,
            subpacote,
            tratamentos: tratamentosJSON,
            data_hora_consulta,
        });

        console.log('sessao ID:', sessao.id);

        // Inserir na tabela intermediária (Tratamentos) associando o usuário logado
        await Tratamentos.create({
            userId: usuaioId,             // ID do usuário logado
            sessaoId: sessao.id, // ID da sessão recém-criada
            status: 'marcado',   // Status padrão
        });

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

        })
    }
}