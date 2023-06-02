const Model = require('../Model');

class Symptom extends Model {
    constructor(mongoose, QueryBuilder) {
        const schema = new mongoose.Schema({
            name: { type: String, required: true },
            description: { type: String, required: true },
            severity: { type: String, required: true },
            isDeleted: { type: Boolean, default: false }
        })

        super(mongoose, 'Symptom', QueryBuilder, schema);
    };

    getAll () {
        return this.model.find({
            condition: {
                isDeleted: false
            }
        })
    }
};

module.exports = Symptom;