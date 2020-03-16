import fixDatePartsPositionsFactory from '../fixDatePartsPositionsFactory';
import getDatesPartsPositions from '../getDatesPartsPositions';


describe('fixesDatePartsPositions', () => {
  it('should return the date correctly to be read by new Date()', () => {
    const partsPositions = getDatesPartsPositions(['2-3-2019', '15-2-2019']);
    const fixDateParts = fixDatePartsPositionsFactory(partsPositions);
    expect(['2-3-2019', '15-2-2019'].map(fixDateParts)).toEqual(['2019-3-2', '2019-2-15']);
  });
});

