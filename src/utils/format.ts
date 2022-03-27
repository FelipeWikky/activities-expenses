import { format } from "date-fns";

const FORMAT_DATE = "dd/MM/yyyy";
const FORMAT_DATETIME = "dd/MM/yyyy HH:mm";

export const formatDate = (value: string | Date) => {
    if (value instanceof Date)
        return format(value, FORMAT_DATE);
    return format(new Date(value), FORMAT_DATE);
}


export const formatDateTime = (value: string | Date) => {
    if(!value ) return '';
    const date = value instanceof Date ? value : new Date(value);
    return format(date, FORMAT_DATETIME);
}