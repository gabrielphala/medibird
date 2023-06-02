const { mongoose } = require('../../config/database');
const QueryBuilder = require('../../helpers/Query-builder');

const Symptom = require('./Symptom');

module.exports = new Symptom(mongoose, QueryBuilder);