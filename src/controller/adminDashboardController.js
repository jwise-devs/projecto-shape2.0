exports.index = async (req, res) => {
    try {

        res.render('adminDashboard');
        
    } catch (error) {
        console.error('Erro ao buscar tratamentos:', error);
        req.flash('error', 'Erro ao carregar os tratamentos.');
        return res.redirect('back');
    }
}

