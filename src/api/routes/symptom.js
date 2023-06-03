const base_controller = require('../controllers/base');
const symptom_service = require('../../services/Symptom');

module.exports = (router) => {
    router.post('/symptom/add', base_controller.wrap(symptom_service.add));
    router.post('/symptom/delete', base_controller.wrap(symptom_service.symptomDelete));
    router.post('/symptoms/get-all', base_controller.wrap(symptom_service.getAll));
};