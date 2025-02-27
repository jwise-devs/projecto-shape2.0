const Usuario = require("../model/Usuario");
const nodemailer = require("nodemailer");
require('dotenv').config();

let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS  // Senha de aplicativo
    }
});

exports.index = async (req, res) => {
    try {
        const usuarioId = res.locals.user.id;
        const usuario = await Usuario.findByPk(usuarioId);

        res.render('consultaemcasa', {
            locationSaved: !!usuario.localizacao,  
            localizacao: usuario.localizacao || '',  
            csrfToken: req.csrfToken()
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
            req.flash('error', 'Usuário não encontrado!');
            return res.redirect('/consultaemcasa');
        }

        let mailOptions = {
            from: `"Consulta em Casa" <${process.env.EMAIL_USER}>`,
            to: `${process.env.EMAIL_DEST}`, 
            subject: 'Nova Solicitação de Serviço',
            html: `
                <h3>Nova Solicitação de Consulta</h3>
                <p><strong>Nome:</strong> ${usuario.nome}</p>
                <p><strong>Telefone:</strong> ${usuario.telefone || 'Não informado'}</p>
                <p><strong>Localização:</strong> <a href="${usuario.localizacao}" target="_blank">Abrir no Google Maps</a></p>
            `
        };

        await transporter.sendMail(mailOptions);

        req.flash('success', 'Solicitação enviada com sucesso!');
        res.redirect('/consultaemcasa');

    } catch (error) {
        console.error(error);
        req.flash('error', 'Erro ao enviar solicitação.');
        res.redirect('/consultaemcasa');
    }
};
