import DatesPositionsType from "./DatesPositionsType";

export default (datesPartsPositions: DatesPositionsType) => (date?: string) => {
  if (!date) {
    return date;
  }

  const match = /(\d*)-(\d*)-(\d*)/.exec(date);

  if (
    match &&
    typeof (datesPartsPositions.year) === 'number' &&
    typeof (datesPartsPositions.month) === 'number' &&
    typeof (datesPartsPositions.day) === 'number'
  ) {
    return match[datesPartsPositions.year + 1] + '-' + match[datesPartsPositions.month + 1] + '-' + match[datesPartsPositions.day + 1];
  }

  return date;
}
