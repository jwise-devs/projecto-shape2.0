const Sessao = require('../model/Sessao');
const Pupila = require('../model/Pupilas');  // model da tabela pupila
const Tratamentos = require('../model/Tratamentos');  // model da tabela pupila
const ConsultaEmCasa = require('../model/ConsultaEmCasa');  // model da tabela pupila
const { Op, where } = require('sequelize');
const nodemailer = require("nodemailer");
const path = require('path');
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

        const sessoesAlocadas = await ConsultaEmCasa.findAll({
            where: { pupilaId: pupilaId }
        });

        const sessoes = sessoesData.map(sessao => {
            const plain = sessao.get({ plain: true });

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

            // Marcar se essa sessão já foi alocada para essa pupila
            plain.jaAlocada = sessoesAlocadas.some(aloc =>
                new Date(aloc.data_hora_consulta).getTime() === new Date(plain.data_hora_consulta).getTime()
            );

            return plain;
        });

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
                <p><strong>Foto:</strong></p>
                <img src="cid:fotopupila" alt="Foto da Pupila" width="150">
            `,
            attachments: [{
                filename: 'fotopupila.jpg',
                path: path.join(__dirname, '..', '..', 'uploads', 'images', path.basename(pupila.fotoPupila)),
                cid: 'fotopupila' // mesmo cid do img
            }]
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
