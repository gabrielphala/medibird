import _fetch from "../helpers/fetch.js";
import { showError } from "../helpers/error.js";
import { closeModal } from "../helpers/modal.js"
import { arrayNotEmpty } from "../helpers/array.js";

import {
    formatSelect,
    formatDiseasesForAdmin,
    fomratDiseaseSearch
} from "../helpers/format.js";

import Slider from "../helpers/disease-form.js"

window.process_started = false;

$('#symptom-1').html(formatSelect((await _fetch('/symptoms/get-all')).symptoms))

export default class Disease {
    static async addOverview () {
        process_started = true;

        const _paragraphs = Array.from($('.paragraph-input'));
        const paragraphs = []

        _paragraphs.forEach(paragraph => {
            paragraphs.push(paragraph.value); 
        });

        const response = await _fetch('/disease/add-overiew', {
            body: {
                name: $('#disease-name').val(),
                paragraphs
            }
        })

        if (response.successful) {
            Slider.nextHeightControl()

            $('#disease-id').val(response.diseaseId)

            $('#symptom-1').html(formatSelect((await _fetch('/symptoms/get-all')).symptoms))

            $('#disease-overview-form')[0].style.marginLeft = '-100%';
        }

        showError('new-overview', response.error);
    }
    
    static async addSymptoms () {
        const _symptoms = Array.from($('.symptoms__item'));
        const symptoms = []

        _symptoms.forEach(symptom => {
            symptoms.push(symptom.value);
        });

        const response = await _fetch('/disease/add-symptoms', {
            body: {
                diseaseId: $('#disease-id').val(),
                symptoms
            }
        })

        if (response.successful) {
            Slider.nextHeightControl()

            $('#disease-overview-form')[0].style.marginLeft = '-200%';
        }

        showError('symptom-add', response.error);
    }

    static async addTreatments () {
        const treatments_container = Array.from($('.treatment_item'));
        const treatments = []

        treatments_container.forEach(container => {
            const inputs = $('textarea', container);

            treatments.push({
                name: inputs[0].value,
                description: inputs[1].value,
            });
        });

        const response = await _fetch('/disease/add-treatments', {
            body: {
                diseaseId: $('#disease-id').val(),
                treatments
            }
        })

        if (response.successful) {
            Slider.nextHeightControl()

            $('#disease-overview-form')[0].style.marginLeft = '-300%';
        }

        showError('treatment-add', response.error);
    }

    static async addThumbnails () {
        const thumbnails = Array.from($('.thumbnail_item'));

        const data = new FormData();

        let index = 0;

        thumbnails.forEach(container => {
            const inputs = $('input', container);
            const file = inputs[0].files[0]
            const title = inputs[1].value;
            const description = inputs[2].value;

            data.append(`file${index}`, file);
            data.append(`title${index}`, title);
            data.append(`description${index}`, description);

            index++;
        });

        data.append('thumbnailCount', $('#thumbnail-count').val());
        data.append('diseaseId', $('#disease-id').val());

        const response = await (await fetch('/disease/add-thumbnails', {
            method: 'POST',
            body: data
        })).json()

        if (response.successful) {
            Disease.getAll()

            closeModal('disease');
        }

        showError('thumbnail-add', response.error);
    }

    static async deleteDisease (diseaseId) {
        const response = await _fetch('/disease/delete', {
            body: {
                diseaseId
            }
        });

        Disease.getAll();
    }

    static async getAll () {
        const response = await _fetch('/diseases/get-all');

        if (arrayNotEmpty(response.diseases)) {
            $('#disease-list').html(formatDiseasesForAdmin(response.diseases));

            $('.table__body__row__item__view').off()
            $('.table__body__row__item__view').on('click', e => {
                const urlsafename = e.currentTarget.parentElement.parentElement.dataset.urlsafename;

                location.href = `/${urlsafename}`;
            })

            $('.table__body__row__item__delete').off()
            $('.table__body__row__item__delete').on('click', e => {
                const diseaseid = e.currentTarget.parentElement.parentElement.dataset.diseaseid;

                Disease.deleteDisease(diseaseid);
            })

            return $('#no-diseases').removeClass('flex');
        }

        $('#disease-list').html('')
        return $('#no-diseases').addClass('flex');
    }

    static async search (symptoms) {
        const response = await _fetch('/diseases/search', {
            body: {
                symptoms
            }
        });

        if (response.successful) {
            console.log(response.diseases);
            if (arrayNotEmpty(response.diseases)) {
                $('#search-list').html(fomratDiseaseSearch(response.diseases));
                return $('#empty-search').hide();
            }

            $('#search-list').html('')
            return $('#empty-search').show();
        }
    }
}