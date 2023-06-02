const base_controller = require('../controllers/base');
const disease_service = require('../../services/Disease');

const { anyFiles } = require('../../config/multer');

module.exports = (router) => {
    router.post('/disease/add-overiew', base_controller.wrap(disease_service.addOverview));
    router.post('/disease/add-symptoms', base_controller.wrap(disease_service.addSymptoms));
    router.post('/disease/add-treatments', base_controller.wrap(disease_service.addTreatments));
    router.post('/disease/delete', base_controller.wrap(disease_service.deleteDisease));

    router.post(
        '/disease/add-thumbnails',
        (req, res, next) => {
            anyFiles('./public/assets/uploads/diseases')(req, res, async (err) => {
                req.res_wrap = await disease_service.addThumbnails(
                    base_controller.res_wrap,
                    req.body,
                    req
                )

                next()
            })
        },
        base_controller.wrap_with_request((res_wrap, _, req) => {
            return { ...res_wrap, ...req.res_wrap }
        })
    );

    router.post('/diseases/get-all', base_controller.wrap(disease_service.getAll));

    router.post('/diseases/search', base_controller.wrap(disease_service.search));
};