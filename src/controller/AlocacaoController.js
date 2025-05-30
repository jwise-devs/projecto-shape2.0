const Sessao = require('../model/Sessao');
const Pupila = require('../model/Pupilas');  // model da tabela pupila
const Tratamentos = require('../model/Tratamentos');  // model da tabela pupila
const ConsultaEmCasa = require('../model/ConsultaEmCasa');  // model da tabela pupila
const { Op } = require('sequelize');
const nodemailer = require("nodemailer");
require('dotenv').config();

let transporter = nodemailer.createTransport({
    service: "gmail",
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS  // Senha de aplicativo
    },
});


exports.index = async (req, res) => {
    try {
        const pupilaId = req.params.id;

        const pupila = await Pupila.findByPk(pupilaId);
        if (!pupila) {
            req.flash('error', 'Pupila não encontrada.');
            return res.redirect('/clientes');
        }

        const sessoesData = await Sessao.findAll({
            where: { pacote: 'consulta_em_casa' },
            order: [['data_hora_consulta', 'ASC']]
        });

        const sessoes = sessoesData.map(sessao => {
            const plain = sessao.get({ plain: true });

            // Corrige tratamentosArray para garantir que seja um array
            try {
                if (typeof plain.tratamentosArray === 'string') {
                    plain.tratamentosArray = JSON.parse(plain.tratamentosArray);
                }
            } catch (e) {
                plain.tratamentosArray = [];
            }

            if (!Array.isArray(plain.tratamentosArray)) {
                plain.tratamentosArray = [];
            }

            return plain;
        });

        console.log(sessoes.map(s => s.tratamentosArray));

        return res.render('alocacao', {
            pupila,
            sessoes,
            csrfToken: req.csrfToken()
        });

    } catch (error) {
        console.error('Erro ao carregar alocação:', error);
        req.flash('error', 'Erro ao carregar a alocação.');
        return res.redirect('back');
    }
};


exports.storeAlocacao = async (req, res) => {
    console.log('Requisição POST recebida', req.body);

    try {
        const { sessaoId, pupilaId } = req.body;
        console.log('Dados recebidos:', req.body); // DEBUG

        if (!sessaoId || !pupilaId) {
            req.flash('error', 'Dados incompletos para alocação.');
            return res.redirect('back');
        }

        const pupila = await Pupila.findByPk(pupilaId);
        if (!pupila) {
            req.flash('error', 'Pupila não encontrada.');
            return res.redirect('/funcionarios');
        }

        const sessao = await Sessao.findByPk(sessaoId);
        if (!sessao) {
            req.flash('error', 'Sessão não encontrada.');
            return res.redirect('/funcionarios');
        }

        await ConsultaEmCasa.create({
            pupilaId: pupila.id,
            nome: pupila.nome,
            sobrenome: pupila.sobrenome,
            tratamentosArray: sessao.tratamentosArray,
            data_hora_consulta: sessao.data_hora_consulta,
            numero_sessao: 1,
            status: 'marcada',
        });

        const mailOptions = {
            from: `"Shape" <${process.env.EMAIL_DEST}>`,
            to: `${process.env.EMAIL_USER}`,
            subject: 'Consulta em Casa',
            html: `
                <h3>Dados da Pupila</h3>
                <p><strong>Nome:</strong> ${pupila.nome}</p>
                <p><strong>Sobrenome:</strong> ${pupila.sobrenome}</p>
                <p><strong>Telefone:</strong> ${pupila.numeroCelular}</p>
            `
        };

        await transporter.sendMail(mailOptions);

        req.flash('success', 'Sessão alocada com sucesso!');
        res.redirect('/funcionarios');
    } catch (error) {
        console.error('Erro ao alocar sessão:', error);
        req.flash('error', 'Erro ao alocar sessão.');
        res.redirect('back');
    }
};
