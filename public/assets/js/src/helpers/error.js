export const showError = (id, message) => {
    const parent = $(`#${id}-error`)

    parent[0].innerText = message;

    parent[0].style.display = 'block';
}

export const clearError = (id) => {
    $(`#${id}-error`).hide()
}