export const createTreatment = () => {
    const treatmentCount = parseInt($('#treatment-count').val()) + 1;

    const itemTemplate = `
        <div class="treatment-container__item flex flex--a-center" id="treatment-${treatmentCount}" style="margin-top: 1rem;">
            <div class="inputs treatment_item" style="flex: 1; margin-right: 1rem;">
                <div class="input">
                    <textarea placeholder="Treatment title"></textarea>
                </div>
                <div class="input">
                    <textarea placeholder="treatment description"></textarea>
                </div>
            </div>
            <svg class="image--icon" id="delete-treatment-${treatmentCount}" style="fill: #b68c8c;">
                <use href="#cancel"></use>
            </svg>
        </div>
    `;

    const parent = $(`.treatment-container`)[0];

    $(itemTemplate).appendTo(parent);

    $(`#delete-item-${treatmentCount}`).on('click', (e) => {
        const itemId = e.currentTarget.id.split('-')[2];

        removeTreatment(itemId);
    });

    $('#treatment-count').val(treatmentCount);
};

export const removeTreatment = (itemId) => {
    const treatmentCount = parseInt($('#treatment-count').val());

    if (treatmentCount == 1)
        return;

    $(`#treatment-${itemId}`).remove();
    $('#treatment-count').val(treatmentCount - 1);
};