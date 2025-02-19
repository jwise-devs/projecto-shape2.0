const Sessao = require('../model/Sessao');
const Tratamentos = require('../model/Tratamentos');

exports.index = async (req, res) => {
    try {
        // Buscar tratamentos do usuário logado e incluir dados da sessão
        const tratamentos = await Tratamentos.findAll({
            where: { userId: res.locals.user.id }, // Filtra pelo usuário logado
            include: [
                {
                    model: Sessao, // Inclui a tabela Sessao
                    as: 'sessao',  // Usa o alias definido no modelo
                    attributes: ['pacote', 'subpacote', 'tratamentos', 'data_hora_consulta'], // Campos necessários
                },
            ],
        });

        // Renderizar a view e enviar os dados
        
        res.render('userDashboard', { tratamentos });
    } catch (error) {
        console.error('Erro ao buscar tratamentos:', error);
        req.flash('error', 'Erro ao carregar os tratamentos.');
        return res.redirect('back');
    }
}

