export const shortenStr = (str, limit = 25) => {
    if (str.length < limit) return str;
    else return str.substring(0, limit - 1) + '...';
}