export const getPercentageValue = (value: number, percentage: number) => {
    return value - ((value * percentage) / 100);
}

export const isEmpty = (obj: object) => {
    let empty = true;
    if(!obj || Object.keys(obj).length <= 0) return empty;

    for(let key of Object.keys(obj)) {
        if(!(obj[key] === null || obj[key] === undefined || obj[key] === false)) {
            empty = false;
            break;
        }
    }
    return empty;
}