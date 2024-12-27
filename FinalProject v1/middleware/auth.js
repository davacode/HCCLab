const isAuthenticated = (req, res, next) => {
    if (req.session.user) {
        return next();
    }
    res.redirect('/users/login');
};


const isAdmin = (req, res, next) => {
    if (req.session.role === 'admin') {
        next();
    } else {
        res.status(403).json({ error: 'Forbidden: Admins only' });
    }
};

module.exports = { isAuthenticated, isAdmin };
