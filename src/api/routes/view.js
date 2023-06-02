const base_controller = require('../controllers/base');
const disease_service = require('../../services/Disease');

module.exports = (router) => {
    router.get('/:urlsafename', async (req, res) => {
        const diseaseInfo = await disease_service.getByUrlSafeName(req.params.urlsafename);

        res.render('disease/view', {
            page: {
                title: `Learn more - ${diseaseInfo.name}`
            },
            disease: diseaseInfo
        });
    });
};