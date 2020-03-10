import {
  setActiveTab,
  updateGlobalFilter,
} from './financialActions';
import FinancialForecastReducer, { initialState, State } from './financialReducer';


describe('FinancialForecastReducer', () => {
  describe('updateGlobalFilter', () => {
    it('should update global filter and filter transactions', () => {
      const state: State = {
        ...initialState,
      };

      const actual = FinancialForecastReducer(state, updateGlobalFilter('startDate', '2019-06-01'));
    });
  });

  it('setActiveTab should update tab field', () => {
    const state: State = {
      ...initialState,
      tab: '1',
    };

    const actual = FinancialForecastReducer(state, setActiveTab('2'));

    const expected = {
      ...initialState,
      tab: '2',
    };

    expect(actual).toEqual(expected);
  });
});
