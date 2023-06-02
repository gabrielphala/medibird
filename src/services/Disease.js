const Disease = require("../models/Disease")

const v = require("../helpers/Validation")
const string = require("../helpers/String")

module.exports = class SymptomService {
    static async addOverview (res_wrap, body) {
        v.validate({
            'Disease name': { value: body.name, min: 3, max: 30 }
        });

        let count = 0, error;

        body.paragraphs.forEach(paragraph => {
            let paragraph_name = `Paragraph ${++count}`;

            if (paragraph.length < 150) return error = `${paragraph_name} must have at least 150 characters`;
            else if (!paragraph) return error = `${paragraph_name} cannot be empty`
        });

        if (error) throw error;

        const diseaseInfo = await Disease.add({
            name: body.name,
            urlSafeName: body.name.toLowerCase().replace(/ /g, '-') + '-' + string.uniqueId(4),
            overview: body.paragraphs
        })

        res_wrap.diseaseId = diseaseInfo._id;

        res_wrap.successful = true;

        return res_wrap;
    }

    static async addSymptoms (res_wrap, body) {
        let count = 0, error;

        body.symptoms.forEach(symptom => {
            let symptom_name = `Symptom ${++count}`;

            if (!symptom) return error = `${symptom_name} cannot be empty`
        });

        if (error) throw error;

        await Disease.addSymptoms(body.diseaseId, body.symptoms);

        res_wrap.successful = true;

        return res_wrap;
    }

    static async addTreatments (res_wrap, body) {
        let count = 0, error;

        body.treatments.forEach(({ name, description }) => {
            let treatment_name = `Treatment ${++count}`;

            if (!name) return error = `${treatment_name} has no name`;

            else if (!description) return error = `${treatment_name} has no description`
        });

        if (error) throw error;

        await Disease.addTreatments(body.diseaseId, body.treatments);

        res_wrap.successful = true;

        return res_wrap;
    }

    static async addThumbnails (res_wrap, body, req) {
        const thumbnails = [];

        for (let i = 0; i < body.thumbnailCount; i++) {
            thumbnails.push({
                filename: req.files[i].filename,
                title: body[`title${i}`],
                description: body[`description${i}`]
            })
        }

        await Disease.addThumbnails(body.diseaseId, thumbnails);

        res_wrap.successful = true;

        return res_wrap;
    }

    static async getByUrlSafeName (urlSafeName) {
        return await Disease.model.findOne({
            condition: {
                urlSafeName
            } 
        });
    }

    static async getAll (res_wrap, _) {
        try {
            res_wrap.diseases = await Disease.getAll();
            
            return res_wrap;
        } catch (e) { throw e }
    }

    static async getLatestThree () {
        try {
            return await Disease.getLatestThree();
        } catch (e) { throw e }
    }

    static async search (res_wrap, body) {
        const symptoms = body.symptoms.split(",")
        const firstsort = {},
            secondsort = {},
            lastsort = [];

        for (let i = 0; i < symptoms.length; i++) {
            const symptom = symptoms[i].trim().toLowerCase();

            const diseases = await Disease.findBySymptom(symptom)

            for (let j = 0; j < diseases.length; j++) {
                const disease = diseases[j];
                firstsort[disease._id] = firstsort[disease._id] || disease.toJSON();

                firstsort[disease._id]._count = firstsort[disease._id]._count ?
                    firstsort[disease._id]._count + 1 :
                    1;
            }            
        }

        for (const key in firstsort) {
            if (!(Object.hasOwnProperty.call(firstsort, key))) 
                continue;
            
            secondsort[firstsort[key]._count] = secondsort[firstsort[key]._count] || []

            secondsort[firstsort[key]._count].push(firstsort[key])
        }

        const keys = Object.keys(secondsort);

        keys.sort((a, b) => b - a);

        keys.forEach(key => {
            lastsort.push(...secondsort[key])
        });

        res_wrap.successful = true;
        res_wrap.diseases = lastsort;

        return res_wrap;
    }

    static async deleteDisease (res_wrap, body) {
        try {
            Disease.delete(body.diseaseId)
            
            return res_wrap;
        } catch (e) { throw e; }
    }
}