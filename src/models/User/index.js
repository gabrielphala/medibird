const { mongoose } = require('../../config/database');
const QueryBuilder = require('../../helpers/Query-builder');

const User = require('./User');

module.exports = new User(mongoose, QueryBuilder);