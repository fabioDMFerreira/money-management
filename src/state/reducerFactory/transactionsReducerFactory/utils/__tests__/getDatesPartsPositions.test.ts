import getDatesPartsPositions from '../getDatesPartsPositions';

describe('getDatesPartsPositions', () => {
  it('should return default dates positions (year=2,month=1,day=0) if no date is passed', () => {
    expect(getDatesPartsPositions([])).toEqual({ year: 2, month: 1, day: 0 });
    expect(getDatesPartsPositions([undefined])).toEqual({ year: 2, month: 1, day: 0 });
  });

  it('should return next positions year=2,month=1,day=0 for dates with format dd-mm-yyyy', () => {
    expect(getDatesPartsPositions(['2-3-2019', '15-2-2019'])).toEqual({ year: 2, month: 1, day: 0 });
  });

  it('should return next positions year=0,month=1,day=2 for dates with format yyyy-mm-dd', () => {
    expect(getDatesPartsPositions(['2019-3-2', '2019-3-15'])).toEqual({ year: 0, month: 1, day: 2 });
  });

  it('should return next positions year=1,month=0,day=2 for dates with format mm-yy-dd', () => {
    expect(getDatesPartsPositions(['2-2020-2', '12-2020-15'])).toEqual({ year: 1, month: 0, day: 2 });
  });

  it('should return next positions year=2,month=0,day=1 for dates with format mm-dd-yyyy', () => {
    expect(getDatesPartsPositions(['2-2-2020', '12-25-2012'])).toEqual({ year: 2, month: 0, day: 1 });
  });
});
