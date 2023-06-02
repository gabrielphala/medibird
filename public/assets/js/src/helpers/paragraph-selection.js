export const createParagraph = () => {
    const paragraphCount = parseInt($('#paragraph-count').val()) + 1;

    const itemTemplate = `
        <div class="paragraph-container__item flex flex--a-center" id="paragraph-item-${paragraphCount}">
            <div class="input">
                <textarea class="paragraph-input" id="paragraph-${paragraphCount}" placeholder="Paragraph"></textarea>
            </div>
            <svg class="image--icon" id="delete-item-${paragraphCount}">
                <use href="#cancel"></use>
            </svg>
        </div>
    `;

    const parent = $(`.paragraph-container`)[0];

    $(itemTemplate).appendTo(parent);

    $(`#delete-item-${paragraphCount}`).on('click', (e) => {
        const itemId = e.currentTarget.id.split('-')[2];

        removeParagraph(itemId);
    });

    $('#paragraph-count').val(paragraphCount);
};

export const removeParagraph = (itemId) => {
    const paragraphCount = parseInt($('#paragraph-count').val());

    if (paragraphCount == 1)
        return;

    $(`#paragraph-item-${itemId}`).remove();
    $('#paragraph-count').val(paragraphCount - 1);
};