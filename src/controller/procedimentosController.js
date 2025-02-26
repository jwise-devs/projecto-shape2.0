const Tratamentos = require("../model/Tratamentos");
const Usuario = require("../model/Usuario");
const Sessao = require("../model/Sessao");

exports.index = async (req, res) => {
    try {
        const tratamentos = await Tratamentos.findAll({
            include: [
                {
                    model: Usuario,
                    as: "usuario",
                    attributes: ["id", "nome", "email"],
                },
                {
                    model: Sessao,
                    as: "sessao",
                    attributes: ["tratamentos"], // Pegamos o campo que contém os nomes dos tratamentos
                }
            ],
        });

        res.render("procedimentos", { tratamentos });
    } catch (error) {
        console.error("Erro ao buscar tratamentos:", error);
        res.render("procedimentos", { tratamentos: [] });
    }
};
