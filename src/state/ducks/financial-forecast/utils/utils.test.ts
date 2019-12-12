import fixDatePartsPositionsFactory from './fixDatePartsPositionsFactory';
import getDatesPartsPositions from './getDatesPartsPositions';

describe('getDatesPartsPositions', () => {
  it('should return next positions year=2,month=1,day=0', () => {
    expect(getDatesPartsPositions(['2-3-2019', '15-2-2019'])).toEqual({ year: 2, month: 1, day: 0 });
  });

  it('should return next positions year=0,month=1,day=2', () => {
    expect(getDatesPartsPositions(['2019-3-2', '2019-3-15'])).toEqual({ year: 0, month: 1, day: 2 });
  });
});
describe('fixesDatePartsPositions', () => {
  it('should return the date correctly to be read by new Date()', () => {
    const partsPositions = getDatesPartsPositions(['2-3-2019', '15-2-2019']);
    const fixDateParts = fixDatePartsPositionsFactory(partsPositions);
    expect(['2-3-2019', '15-2-2019'].map(fixDateParts)).toEqual(['2019-3-2', '2019-2-15']);
  });
});

