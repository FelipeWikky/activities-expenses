export const sortByDate = (array: object[], property: string) => {
    return array.sort((a, b) => {
        if (a[property] > b[property])  return -1;
        if (a[property] < b[property])  return 1;
        return 0;
    });
}