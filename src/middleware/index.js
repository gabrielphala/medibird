const jwt = require('../helpers/Jwt');

module.exports.isUserOrAdminAuth = (req, res, next) => {
    const userNotLoggedIn = !req.store || req.store && !req.store.user,
        adminNotLoggedIn = !req.store || req.store && !req.store.admin;

    if (userNotLoggedIn && adminNotLoggedIn)
        return res.redirect('/sign-in');

    next();
}

module.exports.isAdminAuth = (req, res, next) => {
    if (!req.store || req.store && !req.store.admin)
        return res.redirect('/a/sign-in');

    next();
}

module.exports.loadUserInfo = (req, res, next) => {
    if (!req.cookies || req.cookies && !req.cookies['med_user'])
        return next();

    jwt.verify(req.cookies['med_user'].jwtAccess, (user) => {
        if (!req.store) req.store = {}
        req.store.user = user;
        res.locals.user = user;
    });

    next();
}

module.exports.loadAdminInfo = (req, res, next) => {
    if (!req.cookies || req.cookies && !req.cookies['med_admin'])
        return next();

    jwt.verify(req.cookies['med_admin'].jwtAccess, (admin) => {
        if (!req.store) req.store = {}
        req.store.admin = admin;
        res.locals.admin = admin;
    });

    next();
}