const Sessao = require("../model/Sessao");
const Usuario = require("../model/Usuario");
const db = require("../database"); // ou o que você usar para acessar o sequelize
const { QueryTypes } = require("sequelize");
const SessaoTratamentoData = require("../model/SessaoTratamentoData"); // <-- certifique-se de importar

exports.index = async (req, res) => {
    try {
        const sessaoId = req.params.id;

        const sessao = await Sessao.findOne({
            where: { id: sessaoId },
            include: { model: Usuario, as: 'usuario', attributes: ['nome'] },
        });

        if (!sessao) {
            req.flash('error', 'Sessão não encontrada.');
            return res.redirect('back');
        }

        if (sessao.tratamentosArray && typeof sessao.tratamentosArray === 'string') {
            sessao.tratamentosArray = JSON.parse(sessao.tratamentosArray);
        }

        const datas = await SessaoTratamentoData.findAll({
            where: { sessaoId }
        });

        const tratamentoDatas = {};
        datas.forEach(entry => {
            const tratamento = entry.nomeTratamento;
            const data = entry.dataComparecimento;
            const compareceu = entry.compareceu;

            if (!tratamentoDatas[tratamento]) {
                tratamentoDatas[tratamento] = [];
            }

            tratamentoDatas[tratamento].push({
                data,
                compareceu
            });
        });

        // Renderizar com os dados
        res.render('progresso', {
            sessao,
            tratamentoDatas // <-- isto é o que estava faltando
        });

    } catch (error) {
        console.error('Erro ao carregar progresso:', error);
        req.flash('error', 'Erro ao carregar o progresso.');
        res.redirect('back');
    }
};

exports.salvarDatasComparecimento = async (req, res) => {
    try {
        const sessaoId = req.params.id;
        const comparecimentos = req.body.comparecimentos || {};
        const novasDatas = req.body.novasDatas || {};

        // Limpa dados antigos (opcional, se quiser sobrescrever completamente)
        await SessaoTratamentoData.destroy({ where: { sessaoId } });

        // Salvar dados existentes (checkboxes)
        for (const tratamento in comparecimentos) {
            for (const entry of Object.values(comparecimentos[tratamento])) {
                const data = entry.data;
                const compareceu = entry.compareceu ? true : false;

                await SessaoTratamentoData.create({
                    sessaoId,
                    nomeTratamento: tratamento,
                    dataComparecimento: data,
                    compareceu
                });
            }
        }

        // Adicionar novas datas sem comparecimento
        for (const tratamento in novasDatas) {
            for (const data of novasDatas[tratamento]) {
                if (data) {
                    await SessaoTratamentoData.create({
                        sessaoId,
                        nomeTratamento: tratamento,
                        dataComparecimento: data,
                        compareceu: false
                    });
                }
            }
        }

        req.flash("success", "Progresso salvo com sucesso!");
        res.redirect("/procedimentos");
    } catch (error) {
        console.error("Erro ao salvar progresso:", error);
        req.flash("error", "Erro ao salvar progresso.");
        res.redirect("back");
    }
};


