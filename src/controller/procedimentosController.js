const Usuario = require("../model/Usuario");
const Sessao = require("../model/Sessao");

exports.index = async (req, res) => {
    try {
        const sessoes = await Sessao.findAll({
            include: [
                {
                    model: Usuario,
                    as: "usuario",
                    attributes: ["id", "nome", "email"],
                }
            ],
        });

        console.log("Sessões encontradas:", JSON.stringify(sessoes, null, 2)); // <-- Verifica os dados no console

        res.render("procedimentos", { sessoes });
    } catch (error) {
        console.error("Erro ao buscar sessões:", error);
        res.render("procedimentos", { sessoes: [] });
    }
};
