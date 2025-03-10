const Usuario = require("../model/Usuario");
const nodemailer = require("nodemailer");
require('dotenv').config();

let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS  // Senha de aplicativo
    },
    tls: {
        rejectUnauthorized: false // Ignora o erro do certificado autoassinado
    }
});

exports.index = async (req, res) => {
    try {
        const usuarioId = res.locals.user.id;
        const usuario = await Usuario.findByPk(usuarioId);

        res.render('consultaemcasa', {
            locationSaved: !!usuario.localizacao,  
            localizacao: usuario.localizacao || '',  
            csrfToken: req.csrfToken(),
            success: req.flash('success')[0] || null, // Garante que sempre tenha um valor
            error: req.flash('error')[0] || null  // Garante que sempre tenha um valor
        });

    } catch (error) {
        console.error(error);
        req.flash('error', 'Erro inesperado. Tente novamente!');
        req.session.save(() => res.redirect('back'));
    }
};


exports.data = async (req, res) => {
    try {
        const { localizacao } = req.body;
        const usuarioId = res.locals.user.id;

        await Usuario.update({ localizacao }, { where: { id: usuarioId } });

        req.flash('success', 'Localização registrada com sucesso!');
        req.session.save(() => res.redirect('/consultaemcasa'));

    } catch (error) {
        console.error(error);
        req.flash('error', 'Erro inesperado. Tente novamente!');
        req.session.save(() => res.redirect('back'));
    }
};

exports.solicitarServico = async (req, res) => {
    try {
        const usuarioId = res.locals.user.id;
        const usuario = await Usuario.findByPk(usuarioId);

        if (!usuario) {
            return res.status(400).json({ success: false, message: 'Usuário não encontrado!' });
        }

        // Obtém a data atual sem a hora (apenas ano, mês e dia)
        const hoje = new Date();
        hoje.setHours(0, 0, 0, 0);

        // Verifica se o usuário já solicitou serviço hoje
        const ultimaSolicitacao = usuario.ultimaSolicitacao;
        if (ultimaSolicitacao && new Date(ultimaSolicitacao).getTime() >= hoje.getTime()) {
            return res.status(400).json({ success: false, message: 'Você já solicitou um serviço hoje. Tente novamente amanhã!' });
        }

        // Atualiza a data da última solicitação para a data atual
        await Usuario.update({ ultimaSolicitacao: new Date() }, { where: { id: usuarioId } });

        let mailOptions = {
            from: `"Shape" <${process.env.EMAIL_USER}>`,
            to: `${process.env.EMAIL_DEST}`, 
            subject: 'Consulta em casa',
            html: `
                <h3>Nova Solicitação de Consulta</h3>
                <p><strong>Nome:</strong> ${usuario.nome}</p>
                <p><strong>Telefone:</strong> ${usuario.telefone || 'Não informado'}</p>
                <p><strong>Localização:</strong> <a href="${usuario.localizacao}" target="_blank">Abrir no Google Maps</a></p>
            `
        };

        await transporter.sendMail(mailOptions);

        return res.json({ success: true, message: 'Solicitação enviada com sucesso!' });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Erro ao enviar solicitação.' });
    }
};


