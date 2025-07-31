const Usuario = require("../model/Usuario");
const Sessao = require("../model/Sessao");
const { Op, fn, col, literal } = require('sequelize');

exports.index = async (req, res) => {
  try {
    const search = req.query.search || '';
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    const hojeStr = hoje.toISOString().slice(0, 10); // 'YYYY-MM-DD'
    console.log(hojeStr)

    const sessoes = await Sessao.findAll({
      include: [
        {
          model: Usuario,
          as: "usuario",
          attributes: ["id", "nome", "email"],
          where: {
            nome: {
              [Op.like]: `%${search}%`
            }
          }
        }
      ],
      where: {
        [Op.and]: [
          {
            [Op.or]: [
              { "$usuario.nome$": { [Op.like]: `%${search}%` } },
              { tratamentosArray: { [Op.like]: `%${search}%` } }
            ]
          },
          { status: "Pendente" },
           { pacote: { [Op.ne]: "consulta_em_casa" } } // <-- aqui está a exclusão do pacote
        ]
      }
    });

    console.log("Sessões encontradas:", JSON.stringify(sessoes, null, 2));

    res.render("procedimentos", { sessoes, search });
  } catch (error) {
    console.error("Erro ao buscar sessões:", error);
    res.render("procedimentos", { sessoes: [], search: '' });
  }
};
