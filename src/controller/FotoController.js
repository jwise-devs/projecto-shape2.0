const multer = require('multer');
const multerConfig = require('../config/multerConfig');
const Foto = require('../model/Foto');

const upload = multer(multerConfig).single('foto');

exports.store = (req, res) => {
  upload(req, res, async (err) => {
    console.log("oi estou aqui");
    if (err) {
      console.error('Erro Multer:', err);
      req.flash('error', 'Erro ao enviar imagem: ' + err.message);
      return res.redirect('back');
    }

    const sessao_id = req.body.sessao_id || req.params.sessaoId;
    const tipo = req.body.tipo;

    console.log('Entrou na rota de upload de foto');
    console.log('URL:', req.originalUrl);
    console.log('sessao_id:', sessao_id);
    console.log('tipo:', tipo);
    console.log('Arquivo recebido:', req.file);

    if (!req.file) {
      req.flash('error', 'Nenhuma imagem enviada.');
      return res.redirect('back');
    }

    if (!['antes', 'depois'].includes(tipo)) {
      req.flash('error', 'Tipo de imagem inválido.');
      return res.redirect('back');
    }

    if (!sessao_id) {
      req.flash('error', 'Sessão não especificada.');
      return res.redirect('back');
    }

    try {
      const { originalname, filename } = req.file;

      await Foto.create({
        originalname,
        filename,
        tipo,
        sessaoId: sessao_id,
      });

      req.flash('success', `Foto do tipo "${tipo}" salva com sucesso.`);
      return res.redirect('back');
    } catch (e) {
      console.error('Erro ao salvar foto:', e);
      req.flash('error', 'Erro ao salvar foto no banco de dados.');
      return res.redirect('back');
    }
  });
};
