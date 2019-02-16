import { monthDiff, sumMonths, intersectMonth, firstMonthDay, lastMonthDay } from './utils';

describe('Forecast utils', () => {

  it('monthsDiff should return the number of months between two dates', () => {
    expect(monthDiff(new Date('2018-01-1'), new Date('2018-10-1'))).toEqual(10);
    expect(monthDiff(new Date('2017-01-1'), new Date('2018-10-1'))).toEqual(22);
    expect(monthDiff(new Date('2016-01-1'), new Date('2018-10-1'))).toEqual(34);
    expect(monthDiff(new Date('2018-02-30'), new Date('2018-01-30'))).toEqual(1);
    expect(monthDiff(new Date('2018-01-01'), new Date('2018-02-28'))).toEqual(2);
  });

  it('sumMonths should return a date with the months summed', () => {
    expect(sumMonths(new Date('2018-01-1'), 9)).toEqual(new Date('2018-10-1'));
    expect(sumMonths(new Date('2018-01-1'), 14)).toEqual(new Date('2019-3-1'));
    expect(sumMonths(new Date('2018-01-1'), 1)).toEqual(new Date('2018-2-1'));
    expect(sumMonths(new Date('2018-01-1'), -1)).toEqual(new Date('2017-12-1'));
    expect(sumMonths(new Date('2018-09-30'), -8)).toEqual(new Date('2018-01-30'));
  });

  it('intersectMonth should return true if date intersects group date', () => {
    expect(
      intersectMonth(new Date('2018-1-15'), new Date('2018-3-1'), new Date('2018-1-1'))
    )
      .toEqual(true);
  });

  it('intersectMonth should return true if start and end date are the same and have the same month of the group date', () => {
    expect(
      intersectMonth(new Date('2018-2-15'), new Date('2018-2-15'), new Date('2018-2-1'))
    )
      .toEqual(true);
  })

  it('firstMonthDay should return first day of the month', () => {
    expect(firstMonthDay(new Date('2018-1-5'))).toEqual(new Date('2018-1-1'));
  });

  it('lastMonthDay should return last day of the month', () => {
    expect(lastMonthDay(new Date('2018-1-5'))).toEqual(new Date('2018-1-31'));
    expect(lastMonthDay(new Date('2018-2-5'))).toEqual(new Date('2018-2-28'));
  });

});
