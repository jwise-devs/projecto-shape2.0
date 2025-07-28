const Usuario = require("../model/Usuario");
const nodemailer = require("nodemailer");
const Sessao = require('../model/Sessao');
const Tratamentos = require('../model/Tratamentos');
require('dotenv').config();

let transporter = nodemailer.createTransport({
    service: "gmail",
    // host: 'smtp.gmail.com',
    // port: 465,
    // secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS  // Senha de aplicativo
    },
});

exports.index = async (req, res) => {
    try {
        const usuarioId = res.locals.user.id;
        const usuario = await Usuario.findByPk(usuarioId);

        // Busca os tratamentos do banco de dados
        const tratamentosData = await Tratamentos.findAll({ where: { pacote: "consulta_em_casa" } });

        // Converte as instâncias para dados puros
        const tratamentos = tratamentosData.map(tratamento => tratamento.get({ plain: true }));

        // Obter os pacotes únicos a partir dos tratamentos (assumindo que o campo pacote existe)
        const pacotes = [...new Set(tratamentos.map(t => t.pacote))];  // Remove pacotes duplicados

        res.render('consultaemcasa', {
            locationSaved: !!usuario.localizacao,
            localizacao: usuario.localizacao || '',
            tratamentos: tratamentos,
            pacotes: pacotes,
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


        const { pacote, subpacote, tratamentos, preco_tratamentos, localizacao } = req.body;

        // Se tratamentos for uma string, converta-a para um array
        const tratamentosJSON = Array.isArray(tratamentos) ? tratamentos : [tratamentos];

        await Usuario.update({ localizacao }, { where: { id: usuarioId } });

        if (!usuario) {
            req.flash('error', 'Usuário não encontrado!');
            return res.redirect('back');
        }

        const hoje = new Date();
        hoje.setHours(0, 0, 0, 0);

        if (usuario.ultimaSolicitacao && new Date(usuario.ultimaSolicitacao).getTime() >= hoje.getTime()) {
            req.flash('error', 'Você já solicitou um serviço hoje. Tente novamente amanhã!');
            return res.redirect('/consultaemcasa');
        }

        const totalFormatado = JSON.parse(preco_tratamentos || "[]").reduce((acc, val) => acc + parseFloat(val), 0).toFixed(2);

        // Criar a sessão no banco de dados
        const sessao = await Sessao.create({
            pacote,
            subpacote,
            tratamentosArray: tratamentosJSON, // Salvar os nomes dos tratamentos na Sessao
            data_hora_consulta: new Date(),
            userId: usuarioId, // ID do usuário logado
            precoSessao: totalFormatado,
            numTotSessao: tratamentosJSON.length,
        });

        // Atualizar última solicitação
        await Usuario.update({ ultimaSolicitacao: new Date() }, { where: { id: usuarioId } });

        const tratamentosFormatados = Array.isArray(tratamentos)
            ? tratamentos.map(t => `<li>${t}</li>`).join("")
            : `<li>${tratamentos}</li>`;


        const mailOptions = {
            from: `"Shape" <${process.env.EMAIL_USER}>`,
            to: `${process.env.EMAIL_DEST}`,
            subject: 'Nova Consulta em Casa',
            html: `
                <h3>Nova Solicitação de Consulta</h3>
                <p><strong>Nome:</strong> ${usuario.nome}</p>
                <p><strong>Telefone:</strong> ${usuario.telefone || 'Não informado'}</p>
                <p><strong>Pacote:</strong> ${pacote}</p>
                <p><strong>Subpacote:</strong> ${subpacote || 'Nenhum'}</p>
                <p><strong>Tratamentos:</strong></p>
                <ul>${tratamentosFormatados}</ul>
                <p><strong>Total:</strong> R$ ${totalFormatado}</p>
                <p><strong>Localização:</strong> <a href="${localizacao || usuario.localizacao}" target="_blank">Ver no Google Maps</a></p>
            `
        };

        await transporter.sendMail(mailOptions);

        req.flash('success', 'Solicitação enviada com sucesso!');
        return res.redirect('/consultaemcasa');

    } catch (error) {
        console.error(error);
        req.flash('error', 'Erro ao enviar solicitação.');
        return res.redirect('back');
    }
};


