exports.error404 = (req, res) => {
    console.log("User na sessão dentro do controller 404:", req.session.user); 
    res.render('404', { user: req.session.user || null });
};