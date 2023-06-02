const admin_routes = require('./admin');
const base_routes = require('./base');
const user_routes = require('./user');
const symptom_routes = require('./symptom');
const view_routes = require('./view');
const disease_routes = require('./disease');

module.exports = (router) => {
    admin_routes(router);
    base_routes(router);
    user_routes(router);
    symptom_routes(router);
    disease_routes(router);
    view_routes(router);
};