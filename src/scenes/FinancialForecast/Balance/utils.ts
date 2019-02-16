export const monthDiff = (date1: Date, date2: Date): number => {
  let months = 0;

  if (date1 > date2) {
    let aux = date1;
    date2 = date1;
    date1 = aux;
  }

  // make dates immutable
  date1 = new Date(firstMonthDay(date1));
  date2 = new Date(firstMonthDay(date2));

  date1.setDate(1);
  date2.setDate(1);

  months = (date2.getFullYear() - date1.getFullYear()) * 12;
  months += date2.getMonth() - date1.getMonth() + 1;
  return months <= 0 ? 0 : months;
}

export const sumMonths = (date: Date, months: number): Date => {
  date = new Date(date.getTime());
  date.setMonth(date.getMonth() + months);
  date.setHours(0);

  return date;
}

export const intersectMonth = (startDate: Date, endDate: Date, groupDate: Date): boolean => {

  const groupStartDate = firstMonthDay(groupDate);
  const groupEndDate = lastMonthDay(groupDate);

  startDate = firstMonthDay(startDate);
  endDate = lastMonthDay(endDate);

  return groupStartDate >= startDate && groupStartDate <= endDate || groupEndDate >= startDate && groupEndDate <= endDate
}

export const firstMonthDay = (date: Date): Date => {
  date = new Date(date.getTime());
  date.setDate(1);
  return date;
}

export const lastMonthDay = (date: Date): Date => {
  date = sumMonths(firstMonthDay(date),1);
  date.setDate(date.getDate()-1);
  return date;
}
