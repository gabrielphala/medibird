const Model = require('../Model');

class Disease extends Model {
    constructor(mongoose, QueryBuilder) {
        const schema = new mongoose.Schema({
            name: { type: String, required: true },
            urlSafeName: { type: String, required: true },
            overview: [{ type: String }],
            symptoms: [{ type: String }],
            treatments: [{
                name: { type: String },
                description: { type: String }
            }],
            thumbnails: [{
                filename: { type: String },
                title: { type: String },
                description: { type: String }
            }],
            isDeleted: { type: Boolean, default: false },
            createdAt: { type: Date, default: Date.now }
        })

        super(mongoose, 'Disease', QueryBuilder, schema);
    };

    addSymptoms = (id, symptoms) => this.model.updateOne({ _id: id }, { symptoms });

    addTreatments = (id, treatments) => this.model.updateOne({ _id: id }, { treatments });

    addThumbnails = (id, thumbnails) => this.model.updateOne({ _id: id }, { thumbnails });

    getAll () {
        return this.model.find({
            condition: {
                isDeleted: false
            }
        })
    }

    getLatestThree () {
        return this.model.find({
            condition: {
                isDeleted: false
            },
            limit: 3
        })
    }

    findBySymptom (symptom) {
        return this.model.find({
            condition: {
                symptoms: symptom
            }
        })
    }
};

module.exports = Disease;