exports.isLogged = (req, res, next) => {
    if(req.session.axiosConfig) {
        next();
    } else {
        res.redirect('/login');
    }
}