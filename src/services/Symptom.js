const Symptom = require("../models/Symptom")

const v = require("../helpers/Validation")

module.exports = class SymptomService {
    static async add (res_wrap, body) {
        v.validate({
            'Symptom': { value: body.name, min: 5, max: 30 },
            'Description': { value: body.description, min: 10, max: 50 }
        });

        if (body.severity == 'select') throw 'Please select severity';

        if (await Symptom.exists({ name: body.name })) throw `Symptom: ${body.name} already exists!`

        Symptom.add({
            name: body.name.toLowerCase(),
            description: body.description,
            severity: body.severity
        });

        res_wrap.successful = true;

        return res_wrap;
    }

    static async getAll (res_wrap, _body) {
        try {
            res_wrap.symptoms = await Symptom.getAll();
            return res_wrap;
        } catch (e) { throw e }
    }
}