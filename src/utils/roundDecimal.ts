export default (num: number, decimalPlaces = 2) => Math.round(num * (10 ** decimalPlaces)) / (10 ** decimalPlaces);
