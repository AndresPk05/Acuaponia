export const format = (date, location, options) =>{
    return Intl.DateTimeFormat(location, options).format(date);
}

export const options = {
    year: 'numeric', month: 'numeric', day: 'numeric',
    hour: 'numeric', minute: 'numeric', second: 'numeric',
    hour12: false
    };