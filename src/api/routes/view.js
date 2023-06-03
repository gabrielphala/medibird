const base_controller = require('../controllers/base');
const disease_service = require('../../services/Disease');

const { isUserOrAdminAuth } = require('../../middleware');

module.exports = (router) => {
    router.get('/v/:urlsafename', isUserOrAdminAuth, async (req, res) => {
        const diseaseInfo = await disease_service.getByUrlSafeName(req.params.urlsafename);

        res.render('disease/view', {
            page: {
                title: `Learn more - ${diseaseInfo.name}`
            },
            disease: diseaseInfo
        });
    });
};