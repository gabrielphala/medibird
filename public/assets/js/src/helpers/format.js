import { shortenStr } from "./string.js";

export const formatSymptomsForAdmin = (symptoms) => {
    let formated = '', count = 1;

    symptoms.forEach(symptom => {
        formated += `
            <ul class="table__body__row table__body__row--symptom" data-symptomid="${symptom.id}">
                <li class="table__body__row__item">${count++}</li>
                <li class="table__body__row__item">${symptom.name}</li>
                <li class="table__body__row__item">${shortenStr(symptom.description)}</li>
                <li class="table__body__row__item">${symptom.severity}</li>
                <li class="table__body__row__item">action here</li>
            </ul>
        `;
    });

    return formated;
}

export const formatDiseasesForAdmin = (diseases) => {
    let formated = '', count = 1;

    diseases.forEach(disease => {
        formated += `
            <ul class="table__body__row table__body__row--disease" data-diseaseid="${disease._id}" data-urlSafeName="${disease.urlSafeName}">
                <li class="table__body__row__item table__body__row__item--short">${count++}</li>
                <li class="table__body__row__item">${disease.name}</li>
                <li class="table__body__row__item table__body__row__item--big">${shortenStr(disease.overview[0], 60)}</li>
                <li class="table__body__row__item flex flex--a-center" style="justify-content: end">
                    <svg class="table__body__row__item__view image--icon"> <use href="#visible"></use> </svg>
                    <svg class="table__body__row__item__edit image--icon"> <use href="#pencil"></use> </svg>
                    <svg class="table__body__row__item__delete image--icon"> <use href="#trash"></use> </svg>
                </li>
            </ul>
        `;
    });

    return formated;
}

export const formatSelect = (data) => {
    let formated = '<option value="select">Select</option>';

    data.forEach((element) => {
        formated += `<option value="${element.name}">${element.name}</option>`
    });

    return formated;
}

export const fomratDiseaseSearch = (diseases) => {
    let formated = '';

    const showSymptoms = (symptoms) => {
        let formatedSymptoms = '';

        for (let i = 0; i < symptoms.length; i++) {
            if (i >= 3) break;

            formatedSymptoms += `<button class="btn margin--right-1">${symptoms[i]}</button>`;
        }

        if (symptoms.length > 3)
            formatedSymptoms += `<p>+ ${symptoms.length - 3} more</p>`

        return formatedSymptoms;
    }

    diseases.forEach(disease => {
        formated += `
            <div class="card search__list__item">
                <div class="card__header">
                    <h4><a href="/${disease.urlSafeName}">${disease.name}</a></h4>
                    <p>${shortenStr(disease.overview[0], 55)}</p>
                    <div class="flex flex--a-center margin--top-2">
                        ${showSymptoms(disease.symptoms)}
                    </div>
                </div>
                <div class="card__footer image--back" style="background-image: url('/assets/uploads/diseases/${disease.thumbnails[0].filename}');"></div>
            </div>
        `;
    });

    return formated;
}