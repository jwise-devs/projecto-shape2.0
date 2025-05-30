const Ficha_De_Dados  = require('../model/Ficha_De_Dados');
exports.checkCsrfError = (err,req,res,next) => {
    if(err) {
        return res.render("404")
    }
    next();
}

exports.middlewareGlobal = (req, res, next) => {
    res.locals.user = req.session.user || null;
    res.locals.messages = {
        success: req.flash('success'),
        error: req.flash('error'),
    };
    next();
};


// Utiliza o comando de "res.locals.crsfToken = req.csrfToken()"
exports.csrfMiddleware = (req,res,next) =>{
    res.locals.csrfToken = req.csrfToken();
    next();
}

exports.loginRequired = (req, res, next) => {
    if (!req.session.user) {
        if (req.xhr || req.headers.accept.indexOf('json') > -1) {
            return res.status(401).json({ message: "Você precisa fazer login." });
        }
        req.flash('error', "Você precisa fazer login");
        return res.redirect("/login/index");
    }
    next();
};


exports.verificarFichaPreenchida = async (req, res, next) => {
    try {
          // Pega o ID da URL ou da sessão
        const userId = req.params.id || req.session.user.id;
        

        // Busca a ficha pelo ID do usuário
        const ficha = await Ficha_De_Dados.findOne({ where: { userId } });

         if (ficha && ficha.formulario_preenchido) {
            req.flash('info', 'Ficha já preenchida.');
            return res.redirect(`/sessao/novo/${userId}`);
        }

        next(); // Permite o acesso à rota do formulário
    } catch (error) {
        console.error(error);
        req.flash('error', 'Erro ao verificar ficha.');
        return res.redirect('/dashboard');
    }
};
  