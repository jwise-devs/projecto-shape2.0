exports.error404 = (req, res) => {
    // Se você tem um sistema de autenticação, geralmente o usuário estará em `req.user`
    const user = req.user || null;  // Se o usuário estiver logado, passa ele para a view, caso contrário, passa null

    // Passa o user para a view
    res.render('404', { user: user });
};