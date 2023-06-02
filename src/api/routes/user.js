const base_controller = require('../controllers/base');
const user_service = require('../../services/User');

module.exports = (router) => {
    router.post('/user/sign-up', base_controller.wrap(user_service.signUp));
    router.post('/user/sign-in', base_controller.wrap(user_service.signIn));
};