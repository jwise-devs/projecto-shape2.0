const Sessao = require("../model/Sessao");
const Usuario = require("../model/Usuario"); // Importe o modelo de Usuário

exports.index = async (req, res) => {
    try {
        console.log("ID recebido na rota:", req.params.id); // Verifica se o ID está correto

        const sessao = await Sessao.findOne({
            where: { id: req.params.id },
            include: { model: Usuario, as: 'usuario', attributes: ['nome'] }, // Inclui o nome do usuário
        });

        console.log("Sessão encontrada:", sessao); // Verifica os dados da sessão

        if (sessao && sessao.tratamentosArray) {
            sessao.tratamentosArray = typeof sessao.tratamentosArray === "string"
                ? JSON.parse(sessao.tratamentosArray) // Converte de string para array se necessário
                : sessao.tratamentosArray;

            console.log("Tratamentos convertidos:", sessao.tratamentosArray);
        }

        res.render('progresso', { sessao });
    } catch (error) {
        console.error('Erro ao buscar clientes:', error);
        req.flash('error', 'Erro ao carregar os clientes.');
        return res.redirect('back');
    }
};
