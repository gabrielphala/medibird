export default () => {
    let date = new Date(),
        hours = date.getHours(),
        message = '';

    if (hours < 12) message = 'Good morning'
    else if (hours >= 12 && hours < 18) message = 'Good afternoon'
    else message = 'Good evenening'

    $('#header-greetings').text(`${message}`);
}