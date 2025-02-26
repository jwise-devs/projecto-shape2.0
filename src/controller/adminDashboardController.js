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

