const { mongoose } = require('../../config/database');
const QueryBuilder = require('../../helpers/Query-builder');

const Disease = require('./Disease');

module.exports = new Disease(mongoose, QueryBuilder);