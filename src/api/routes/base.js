const base_controller = require('../controllers/base');
const disease_service = require("../../services/Disease")

module.exports = (router) => {
    router.get('/', async (req, res) => {
        console.log();

        res.render('base/home', {
            page: {
                title: 'Home'
            },
            diseases: await disease_service.getLatestThree()
        });
    });

    router.get('/sign-up', base_controller.render('base/sign-up', 'Sign up'));
    router.get('/sign-in', base_controller.render('base/sign-in', 'Sign in'));
    router.get('/search', base_controller.render('base/search', 'Search diseases & conditions'));
};