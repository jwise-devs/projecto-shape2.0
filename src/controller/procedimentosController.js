const Usuario = require("../model/Usuario");
const Sessao = require("../model/Sessao");
const { Op } = require('sequelize');

exports.index = async (req, res) => {
    try {
        const search = req.query.search || ''; // Obtém o termo de pesquisa, se houver.

        // Buscar as sessões com base no nome do paciente e nos tratamentos
        const sessoes = await Sessao.findAll({
            include: [
                {
                    model: Usuario,
                    as: "usuario",
                    attributes: ["id", "nome", "email"],
                    where: {
                        nome: {
                            [Op.like]: `%${search}%` // Pesquisa pelo nome do paciente
                        }
                    }
                }
            ],
            where: {
                [Op.or]: [
                    {
                        // Pesquisa pelo nome do paciente
                        "$usuario.nome$": {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        // Pesquisa pelos tratamentos (tratamentosArray armazenado como JSON)
                        tratamentosArray: {
                            [Op.like]: `%${search}%`
                        }
                    }
                ]
            },
        });

        console.log("Sessões encontradas:", JSON.stringify(sessoes, null, 2)); // Verifica as sessões encontradas

        // Passa a variável search para a view
        res.render("procedimentos", { sessoes, search });
    } catch (error) {
        console.error("Erro ao buscar sessões:", error);
        res.render("procedimentos", { sessoes: [], search: '' });
    }
};