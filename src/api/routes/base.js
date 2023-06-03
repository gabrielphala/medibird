const base_controller = require('../controllers/base');
const disease_service = require("../../services/Disease");

const { isUserOrAdminAuth } = require('../../middleware');

module.exports = (router) => {
    router.get('/', async (req, res) => {
        res.render('base/home', {
            page: {
                title: 'Home'
            },
            diseases: await disease_service.getLatestThree()
        });
    });

    router.get('/sign-up', base_controller.render('base/sign-up', 'Sign up'));
    router.get('/sign-in', base_controller.render('base/sign-in', 'Sign in'));
    router.get('/sign-out', base_controller.sign_out);

    router.get('/search', isUserOrAdminAuth, base_controller.render('base/search', 'Search diseases & conditions'));
};