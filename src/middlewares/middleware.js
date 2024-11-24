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
      res.locals.user = req.session.user;  
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