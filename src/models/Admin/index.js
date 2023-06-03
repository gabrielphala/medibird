const { mongoose } = require('../../config/database');
const QueryBuilder = require('../../helpers/Query-builder');

const Admin = require('./Admin');

module.exports = new Admin(mongoose, QueryBuilder);