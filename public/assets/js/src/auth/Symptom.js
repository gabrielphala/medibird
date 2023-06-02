import fetch from "../helpers/fetch.js";
import { showError } from "../helpers/error.js";
import { closeModal } from "../helpers/modal.js"
import { arrayNotEmpty } from "../helpers/array.js";
import { formatSymptomsForAdmin } from "../helpers/format.js"

export default class Symptom {
    static async add () {
        const response = await fetch('/symptom/add', {
            body: {
                name: $('#symptom-name').val(),
                description: $('#symptom-description').val(),
                severity: $('#symptom-severity').val()
            }
        })

        if (response.successful) {
            Symptom.getAll();

            return closeModal('symptom');
        }

        showError('new-symptom', response.error);
    }

    static async getAll () {
        const response = await fetch('/symptoms/get-all');

        if (arrayNotEmpty(response.symptoms)) {
            $('#symptom-list').html(formatSymptomsForAdmin(response.symptoms));
            return $('#no-symptoms').hide();
        }

        $('#symptom-list').html('')
        return $('#no-symptoms').show();
    }
}