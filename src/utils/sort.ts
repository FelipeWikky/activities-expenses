export function sortByDate<T>(array: T[], property: keyof T) {
    if(!array) return array;
    return array.sort((a, b) => {
        if (a[property] > b[property])  return -1;
        if (a[property] < b[property])  return 1;
        return 0;
    });
}