const Usuario = require("../model/Usuario");
const Sessao = require("../model/Sessao");
const { Op, fn, col, literal } = require('sequelize');

exports.index = async (req, res) => {
  try {
    const search = req.query.search || '';
    const hoje = new Date();
    hoje.setHours(0,0,0,0);

    const hojeStr = hoje.toISOString().slice(0,10); // 'YYYY-MM-DD'

   const sessoes = await Sessao.findAll({
  subQuery: false,
  include: [
    {
      model: Usuario,
      as: "usuario",
      attributes: ["id", "nome", "email"],
      required: false
    }
  ],
  where: {
    status: "marcado",
    ...(search && {
      [Op.or]: [
        { '$usuario.nome$': { [Op.like]: `%${search}%` } },

        // 🔥 CORRETO PARA JSON
        where(
          fn('JSON_SEARCH', col('tratamentosArray'), 'one', `%${search}%`),
          { [Op.ne]: null }
        )
      ]
    })
  }
});

    console.log("Sessões encontradas:", JSON.stringify(sessoes, null, 2));

    res.render("marcacoes", { sessoes, search });
  } catch (error) {
    console.error("Erro ao buscar sessões:", error);
    res.render("marcacoes", { sessoes: [] });
  }
};



