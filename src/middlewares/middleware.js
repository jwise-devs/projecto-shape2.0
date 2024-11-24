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
    next();
}

// Utiliza o comando de "res.locals.crsfToken = req.csrfToken()"
exports.csrfMiddleware = (req,res,next) =>{
    res.locals.csrfToken = req.csrfToken();
    next();
}