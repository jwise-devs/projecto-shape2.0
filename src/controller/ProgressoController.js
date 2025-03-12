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

exports.atualizarProgresso = async (req, res) => {
    console.log("Recebendo POST /progresso/:id", req.body);

    try {
        const { progresso } = req.body;
        const sessaoId = req.params.id;

        if (!sessaoId) {
            console.log("Erro: ID da sessão não encontrado.");
            return res.status(400).json({ message: "ID da sessão não encontrado." });
        }

        const sessao = await Sessao.findByPk(sessaoId);

        if (!sessao) {
            console.log("Erro: Sessão não encontrada.");
            return res.status(404).json({ message: "Sessão não encontrada." });
        }

        console.log("Sessão encontrada:", sessao);


        // Aqui você pode salvar os tratamentos no banco
        sessao.progresso = progresso;
        sessao.status = "Concluido";  // Garantindo que o status seja atribuído corretamente

        await sessao.save();  // Tente salvar os dados

        console.log("✅ Progresso salvo com sucesso!");
        req.flash('success', "dados dos procedimentos salvos");
        req.session.save(() => res.redirect('/procedimentos'));
        return;
    } catch (error) {
        console.error("❌ Erro ao salvar progresso:", error);  // Loga o erro completo
        return res.status(500).json({ message: "Erro interno ao salvar progresso." });
    }
};






