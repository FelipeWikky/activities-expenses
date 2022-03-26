export const getPercentageValue = (value: number, percentage: number) => {
    return value - ((value * percentage) / 100);
}