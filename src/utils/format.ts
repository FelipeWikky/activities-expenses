import { format } from "date-fns";

const FORMAT_DATE = "dd/MM/yyyy";
const FORMAT_TIME = "HH:mm";
const FORMAT_DATETIME = "dd/MM/yyyy HH:mm";

export const formatDate = (value: string | Date) => {
    if(!value) return '';
    if (value instanceof Date) return format(value, FORMAT_DATE);

    const date = new Date(value) || '';
    if (!date) return '';
    return format(date, FORMAT_DATE);
}
export const formatTime = (value: string | Date) => {
    if(!value) return '';

    if (value instanceof Date) return format(value, FORMAT_TIME);
    const date = new Date(value) || '';
    if (!date) return '';
    return format(date, FORMAT_TIME);
}

export const formatDateTime = (value: string | Date) => {
    if (!value) return '';
    const date = value instanceof Date ? value : new Date(value);
    return format(date, FORMAT_DATETIME);
}