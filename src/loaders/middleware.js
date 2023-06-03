const { loadUserInfo, loadAdminInfo } = require('../middleware');

const cookieParser = require('cookie-parser');

module.exports = (app) => {
    app.use(cookieParser());
    app.use(loadUserInfo);
    app.use(loadAdminInfo);
};