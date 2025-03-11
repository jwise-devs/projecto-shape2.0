const Ficha_De_Dados  = require('../model/Ficha_De_Dados');
exports.checkCsrfError = (err,req,res,next) => {
    if(err) {
        return res.render("404")
    }
    next();
}

exports.middlewareGlobal = (req,res,next) => {
    res.locals.messages = {
        success: req.flash('success'),
        error: req.flash('error'),
      };
      res.locals.user = req.session.user || null;  
    next();
}

// Utiliza o comando de "res.locals.crsfToken = req.csrfToken()"
exports.csrfMiddleware = (req,res,next) =>{
    res.locals.csrfToken = req.csrfToken();
    next();
}

exports.loginRequired = (req,res,next) =>{
    if(!req.session.user){
        req.flash('error',"Voce precisa fazer login");
        req.session.save(() => res.redirect("/login/index"));
        return;
    }

    next();
}

exports.verificarFichaPreenchida = async (req, res, next) => {
    try {
        const userId = req.session.user.id;

        // Busca a ficha pelo ID do usuário
        const ficha = await Ficha_De_Dados.findOne({ where: { userId } });

        // Verifica se a flag está definida como preenchida
        if (ficha && ficha.formulario_preenchido) {
            req.flash('info', 'Você já preencheu sua ficha.');
            return res.redirect('/sessao');
        }

        next(); // Permite o acesso à rota do formulário
    } catch (error) {
        console.error(error);
        req.flash('error', 'Erro ao verificar ficha.');
        return res.redirect('/dashboard');
    }
};
  