import { format } from "date-fns";

const FORMAT_DATE = "dd/MM/yyyy";
const FORMAT_DATETIME = "dd/MM/yyyy HH:mm";

export const formatDate = (value: string | Date) => {
    if (value instanceof Date)
        return format(value, FORMAT_DATE);
    return format(new Date(value), FORMAT_DATE);
}