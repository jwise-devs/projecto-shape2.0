const Usuario = require("../model/Usuario");


exports.index = async (req, res) => {
    try {
        // Obter o ID do usuário logado
        const usuarioId = res.locals.user.id;

        // Verificar se a localização já foi registrada para este usuário
        const usuario = await Usuario.findByPk(usuarioId);

        // Se a localização estiver registrada, mostra o botão "Solicitar Serviço"
        if (usuario.localizacao) {
            res.render('consultaemcasa', {
                locationSaved: true,  // Variável para verificar se a localização está salva
                localizacao: usuario.localizacao,  // Passa a localização salva
                csrfToken: req.csrfToken()
            });
        } else {
            // Caso contrário, exibe o formulário para o usuário enviar a localização
            res.render('consultaemcasa', {
                locationSaved: false,  // Variável para mostrar o formulário
                localizacao: '',  // Define a variável `localizacao` como vazia
                csrfToken: req.csrfToken()
            });
        }
    } catch (error) {
        console.error(error);
        req.flash('error', 'Erro inesperado. Tente novamente!');
        req.session.save(() => {
            res.redirect('back');
        });
    }
};



exports.data = async (req, res) => {
    try {
        const { localizacao } = req.body;  // Captura o valor enviado pelo formulário

        // Obter o ID do usuário logado
        const usuarioId = res.locals.user.id;

        // Atualizar o usuário com a localização (link do Google Maps)
        await Usuario.update(
            { localizacao },  // Atualiza o campo de localização
            { where: { id: usuarioId } }  // Filtra pelo ID do usuário logado
        );

        // Mensagem de sucesso e redirecionamento
        req.flash('success', 'Localização registrada com sucesso!');
        req.session.save(() => {
            return res.redirect('/consultaemcasa');  // Volta para a mesma página
        });

    } catch (error) {
        console.error(error);
        req.flash('error', 'Erro inesperado. Tente novamente!');
        req.session.save(function () {
            return res.redirect('back');
        });
    }
}


