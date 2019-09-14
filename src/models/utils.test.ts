import { monthDiff, sumMonths, isDateIntervalInGroup, firstMonthDay, lastMonthDay, isMonthsIntervalInGroup, convertCurrencyToNumber } from './utils';

describe('Forecast utils', () => {

  it('monthsDiff should return the number of months between two dates', () => {
    expect(monthDiff(new Date('2018-01-1'), new Date('2018-10-1'))).toEqual(10);
    expect(monthDiff(new Date('2017-01-1'), new Date('2018-10-1'))).toEqual(22);
    expect(monthDiff(new Date('2016-01-1'), new Date('2018-10-1'))).toEqual(34);
    expect(monthDiff(new Date('2018-02-30'), new Date('2018-01-30'))).toEqual(1);
    expect(monthDiff(new Date('2018-01-01'), new Date('2018-02-28'))).toEqual(2);
  });

  describe('sumMonths', () => {
    it('should return a date with the months summed', () => {
      expect(sumMonths(new Date('2018-01-1'), 9)).toEqual(new Date('2018-10-1'));
      expect(sumMonths(new Date('2018-01-1'), 14)).toEqual(new Date('2019-3-1'));
      expect(sumMonths(new Date('2018-01-1'), 1)).toEqual(new Date('2018-2-1'));
    });
    it('should return a date with the months subtracted', () => {
      expect(sumMonths(new Date('2018-01-1'), -1)).toEqual(new Date('2017-12-1'));
      expect(sumMonths(new Date('2018-09-30'), -8)).toEqual(new Date('2018-01-30'));
    });
  })

  describe('isDateIntervalInGroup', () => {
    it('should return true if date intersects group date', () => {
      expect(
        isDateIntervalInGroup(new Date('2018-1-15'), new Date('2018-3-1'), new Date('2018-1-1'))
      )
        .toEqual(true);
    });

    it('should return true if start and end date are the same and have the same month of the group date', () => {
      expect(
        isDateIntervalInGroup(new Date('2018-2-15'), new Date('2018-2-15'), new Date('2018-2-1'))
      )
        .toEqual(true);
    })
  });

  describe('isMonthsIntervalInGroup', () => {

    it('should return true if start date plus months interval number multiplied by particles is inside group date', () => {
      expect(
        isMonthsIntervalInGroup(new Date('2018-01-15'), 3, 2, new Date('2018-01-01'))
      ).toBeTruthy();

      expect(
        isMonthsIntervalInGroup(new Date('2018-01-01'), 3, 2, new Date('2018-04-01'))
      ).toBeTruthy();
    })

    it('should return false if start date plus months interval number multiplied by particles is not inside group date', () => {
      expect(
        isMonthsIntervalInGroup(new Date('2018-01-01'), 3, 2, new Date('2018-02-01'))
      ).toBeFalsy();

      expect(
        isMonthsIntervalInGroup(new Date('2018-01-01'), 3, 2, new Date('2018-03-01'))
      ).toBeFalsy();

      expect(
        isMonthsIntervalInGroup(new Date('2018-01-01'), 3, 2, new Date('2018-05-01'))
      ).toBeFalsy();

      expect(
        isMonthsIntervalInGroup(new Date('2018-01-01'), 3, 2, new Date('2018-06-01'))
      ).toBeFalsy();

      expect(
        isMonthsIntervalInGroup(new Date('2018-01-01'), 3, 2, new Date('2018-07-01'))
      ).toBeFalsy();
    })


    it('should return false if start date is higher that group date ', () => {
      expect(
        isMonthsIntervalInGroup(new Date('2018-03-01'), 3, 2, new Date('2018-01-01'))
      ).toBeFalsy();
    })
  });

  it('firstMonthDay should return first day of the month', () => {
    expect(firstMonthDay(new Date('2018-1-5'))).toEqual(new Date('2018-1-1'));
  });

  it('lastMonthDay should return last day of the month', () => {
    expect(lastMonthDay(new Date('2018-1-5'))).toEqual(new Date('2018-1-31'));
    expect(lastMonthDay(new Date('2018-2-5'))).toEqual(new Date('2018-2-28'));
  });

});

describe('convertCurrencyToNumber', () => {
  it('should fix numbers like 12.123,00', () => {
    expect(convertCurrencyToNumber("12.123,50")).toEqual(12123.50)
  });
})
