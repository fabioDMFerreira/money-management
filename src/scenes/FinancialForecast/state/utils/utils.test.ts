import getDatesPartsPositions from "./getDatesPartsPositions";
import fixDatePartsPositionsFactory from "./fixDatePartsPositionsFactory";

describe('getDatesPartsPositions', () => {
  it('should return next positions year=2,month=1,day=0', () => {
    expect(getDatesPartsPositions(['2-3-2019', '15-2-2019'])).toEqual({ year: 2, month: 1, day: 0 })
  });
})

describe('fixesDatePartsPositions', () => {
  it('should return the date correctly to be read by new Date()', () => {
    const partsPositions = getDatesPartsPositions(['2-3-2019', '15-2-2019']);
    const fixDateParts = fixDatePartsPositionsFactory(partsPositions);
    expect(['2-3-2019', '15-2-2019'].map(fixDateParts)).toEqual(['2019-3-2', '2019-2-15'])
  });
})

