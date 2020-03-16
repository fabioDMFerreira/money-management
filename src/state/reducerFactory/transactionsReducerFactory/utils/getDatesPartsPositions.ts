import { DatesPositionsType } from './DatesPositionsType';

export default (dates: Array<string | undefined>): DatesPositionsType => {
  const result: DatesPositionsType = {};

  for (let i = 0; i < dates.length; i++) {
    const date = dates[i];

    if (!date) {
      break;
    }

    const match = /(\d*)-(\d*)-(\d*)/.exec(date);

    if (match) {
      if (match[1].length === 4) {
        result.year = 0;
      } else if (match[2].length === 4) {
        result.year = 1;
      } else if (match[3].length === 4) {
        result.year = 2;
      }

      if (match[1].length !== 4 && +match[1] > 12) {
        result.day = 0;
        result.month = result.year === 2 ? 1 : 2;
      } else if (match[2].length !== 4 && +match[2] > 12) {
        result.day = 1;
        result.month = result.year === 0 ? 2 : 0;
      } else if (match[3].length !== 4 && +match[3] > 12) {
        result.day = 2;
        result.month = result.year === 1 ? 0 : 1;
      }

      if ('year' in result && 'month' in result && 'day' in result) {
        break;
      }
    }
  }

  if (!('day' in result)) {
    if (result.year === 0) {
      result.month = 1;
      result.day = 2;
    } else if (result.year === 1) {
      result.month = 0;
      result.day = 2;
    } else {
      result.month = 1;
      result.day = 0;
      result.year = 2;
    }
  }

  return result;
};
