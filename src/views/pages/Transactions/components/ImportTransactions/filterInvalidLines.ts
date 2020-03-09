import { number } from 'prop-types';

const countFilledCells = (cells: string[]) => {
  let counter = 0;
  let pendingCounter = 0;

  const cellsLength = cells.length;
  for (let i = 0; i < cellsLength; i++) {
    if (cells[i].replace(' ', '')) {
      counter++;
      if (pendingCounter) {
        counter += pendingCounter;
        pendingCounter = 0;
      }
    } else if (i === 0) {
      break;
    } else {
      pendingCounter++;
    }
  }

  // hotfix
  if (pendingCounter === 1) {
    counter++;
  }

  return counter;
};

export const getMaxIndex = (n: number[]) => {
  if (!n || !number.length) {
    return -1;
  }

  let maxIndex = 0;
  let maxValue = n[0];
  const nLength = n.length;

  for (let i = 0; i < nLength; i++) {
    if (n[i] > maxValue) {
      maxIndex = i;
      maxValue = n[i];
    }
  }

  return maxIndex;
};

export default (lines: string[][]) => {
  const cellsFilled: number[] = lines.map(line => countFilledCells(line));
  const maximum = Math.max(...cellsFilled);

  return lines.filter((line, index) => cellsFilled[index] && cellsFilled[index] === maximum);
};
