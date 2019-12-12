export const sumMonths = (date: Date, months: number): Date => {
  const monthsToSum = months % 12;

  let yearsToSum = 0;
  if (months > 0) {
    yearsToSum = Math.floor(months / 12);
  } else if (months < -11) {
    yearsToSum = Math.ceil(months / 12);
  }

  let summedDateYear = date.getFullYear() + yearsToSum;

  let summedDateMonth = date.getMonth() + 1 + monthsToSum;
  const summedDateDay = date.getDate();

  if (summedDateMonth > 12) {
    summedDateYear++;
    summedDateMonth -= 12;
  } else if (summedDateMonth < 1) {
    summedDateYear--;
    summedDateMonth += 12;
  }

  const summedDate = new Date(Date.UTC(summedDateYear, summedDateMonth - 1, summedDateDay));

  return summedDate;
};

export const firstMonthDay = (date: Date): Date => {
  date = new Date(Date.UTC(date.getFullYear(), date.getMonth(), 1));
  return date;
};

export const lastMonthDay = (date: Date): Date => {
  date = sumMonths(firstMonthDay(date), 1);
  date.setDate(date.getDate() - 1);
  return date;
};

export const isDateIntervalInGroup = (startDate: Date, endDate: Date, groupDate: Date): boolean => {
  const groupStartDate = firstMonthDay(groupDate);
  const groupEndDate = lastMonthDay(groupDate);

  startDate = firstMonthDay(startDate);
  endDate = lastMonthDay(endDate);

  return (groupStartDate >= startDate && groupStartDate <= endDate) || (groupEndDate >= startDate && groupEndDate <= endDate);
};

export const monthDiff = (date1: Date, date2: Date): number => {
  let months = 0;

  if (date1 > date2) {
    const aux = date1;
    date2 = date1;
    date1 = aux;
  }

  // make dates immutable
  date1 = new Date(firstMonthDay(date1));
  date2 = new Date(firstMonthDay(date2));

  date1.setDate(1);
  date2.setDate(1);

  months = (date2.getFullYear() - date1.getFullYear()) * 12;
  months += (date2.getMonth() - date1.getMonth()) + 1;
  return months <= 0 ? 0 : months;
};


export const isMonthsIntervalInGroup = (startDate: Date, interval: number, particles: number, groupDate: Date): boolean => {
  if (firstMonthDay(startDate) > groupDate) {
    return false;
  }

  for (let i = 0; i < particles; i++) {
    const date = sumMonths(startDate, interval * i);

    if (isDateIntervalInGroup(date, date, groupDate)) {
      return true;
    }
  }

  return false;
};


export const convertCurrencyToNumber = (number: string): number => {
  if (!number.indexOf) {
    return 0;
  }

  const commaIndex: number = number.indexOf(',');

  if (commaIndex >= 0 && commaIndex === number.length - 3) {
    number = number.replace('.', '');
    number = number.replace(',', '.');
  }

  return +number;
};
