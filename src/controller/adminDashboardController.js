const imaps = require("imap-simple");
require("dotenv").config();


async function getEmailCount() {
    const config = {
        imap: {
            user: process.env.EMAIL_USER,
            password: process.env.EMAIL_PASS,
            host: "imap.gmail.com",
            port: 993,
            tls: true,
            authTimeout: 10000
        }
    };

    try {
        const connection = await imaps.connect(config);
        await connection.openBox("INBOX"); // Abrindo a caixa de entrada

        // Buscar apenas os e-mails com o assunto "Consulta em casa"
        const searchCriteria = [["HEADER", "SUBJECT", "Consulta em casa"]];
        const fetchOptions = { bodies: ["HEADER"], struct: true };

        const messages = await connection.search(searchCriteria, fetchOptions);
        connection.end(); // Fechar conexão

        return messages.length; // Retorna a quantidade de e-mails encontrados
    } catch (error) {
        console.error("Erro ao buscar e-mails:", error);
        return 0;
    }
}

exports.getEmailCount = async (req, res) => {
    const count = await getEmailCount();
    res.json({ success: true, count });
};

exports.index = async (req, res) => {
    try {

        res.render('adminDashboard');
        
    } catch (error) {
        console.error('Erro ao buscar tratamentos:', error);
        req.flash('error', 'Erro ao carregar os tratamentos.');
        return res.redirect('back');
    }
}

exports.createIndex = async (req, res) => {
    try {

        const verificador = req.params.verificador;
        res.render('registro', { verificador });
        return;


    } catch (error) {
        console.error('Erro ao buscar tratamentos:', error);
        req.flash('error', 'Erro ao carregar os tratamentos.');
        return res.redirect('back');
    }
}

