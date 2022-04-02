export function sortByDate<T>(array: T[], property: keyof T) {
    if (!array) return array;
    return array.sort((a, b) => {
        if (a && b) {
            if (new Date(String(a[property])) > new Date(String(b[property]) as any)) return -1;
            if (new Date(String(a[property])) < new Date(String(b[property]) as any)) return 1;
        }
        return 0;
    });
}