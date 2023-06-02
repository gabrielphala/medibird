export const createSymptom = () => {
    const symptomCount = parseInt($('#symptom-count').val()) + 1;

    const itemTemplate = `
        <div class="input" id="symptom-item-${symptomCount}" style="margin-top: 1.4rem;">
            <label for="symptom-${symptomCount}" id="symptom-${symptomCount}-label">Symptom: ${symptomCount}</label>
            <div class="flex flex--a-center">
                <select id="symptom-${symptomCount}" class="symptoms__item" style="flex: 1;"></select>
                <svg class="image--icon" style="margin-left: 1rem; fill: #b68c8c;" id="delete-symptom-${symptomCount}">
                    <use href="#cancel"></use>
                </svg>
            </div>
        </div>
    `;

    const parent = $(`#symptom-selection-container`);

    $(itemTemplate).appendTo(parent);

    $(`#symptom-${symptomCount}`).html($(`#symptom-1`).html())

    $(`#delete-symptom-${symptomCount}`).on('click', (e) => {
        const itemId = e.currentTarget.id.split('-')[2];

        removeSymptom(itemId);
    });

    $('#symptom-count').val(symptomCount);
};

const rename = (itemId, symptomCount) => {
    itemId = parseInt(itemId);

    for (let i = symptomCount; i > itemId; i--) {
        const oldId = i,
            currentId = oldId - 1;

        const item = $(`#symptom-item-${oldId}`)[0];
        item.id = `symptom-item-${currentId}`;

        const label = $(`#symptom-${oldId}-label`)[0];
        $(label).attr('for', `#symptom-${currentId}`);
        label.id = `symptom-${currentId}-label`;
        label.innerText = `Symptom: ${currentId}`;

        const select = $(`#symptom-${oldId}`)[0];
        select.id = `symptom-${currentId}`;

        const deleteBtn = $(`#delete-symptom-${oldId}`);
        deleteBtn[0].id = `delete-symptom-${currentId}`;

        // remove previous event, because it points to an old id
        deleteBtn.off('click');

        // set new event pointing to current event
        $(deleteBtn).on('click', () => {
            removeSymptom(currentId);
        });
    }

    $('#symptom-count').val(symptomCount - 1);
};

export const removeSymptom = (itemId) => {
    const symptomCount = parseInt($('#symptom-count').val());

    if (symptomCount == 1)
        return;

    $(`#symptom-item-${itemId}`).remove();

    rename(itemId, symptomCount);
};