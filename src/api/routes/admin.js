const base_controller = require('../controllers/base');
// const user_service = require('../../services/User');

module.exports = (router) => {
    router.get('/a/symptoms', base_controller.render('admin/symptoms', 'Monitor symptoms'));
    router.get('/a/diseases', base_controller.render('admin/diseases', 'Monitor diseases'));
};