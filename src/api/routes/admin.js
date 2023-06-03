const base_controller = require('../controllers/base');
const admin_service = require('../../services/Admin');

const { isAdminAuth } = require('../../middleware');

module.exports = (router) => {
    router.get('/a/symptoms', isAdminAuth, base_controller.render('admin/symptoms', 'Monitor symptoms'));
    router.get('/a/diseases', isAdminAuth, base_controller.render('admin/diseases', 'Monitor diseases'));

    router.get('/a/sign-in', base_controller.render('admin/sign-in', 'Administrator sign in'));
    router.get('/a/sign-out', base_controller.admin_sign_out);

    router.post('/a/sign-in', base_controller.wrap(admin_service.signIn));
};