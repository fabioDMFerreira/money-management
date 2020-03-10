import { GlobalFilters } from 'models/GlobalFilters';

import { FinancialForecastActions } from './financialActions';
import {
  SET_ACTIVE_TAB,
  UPDATE_GLOBAL_FILTER,
} from './financialTypes';


export type State = {
  tab: string;
  globalFilters: GlobalFilters;
}

export const initialState: State = {
  tab: 'transactions',
  globalFilters: {},
};


export default (state: State = initialState, action: FinancialForecastActions): State => {
  switch (action.type) {
    case UPDATE_GLOBAL_FILTER: {
      const globalFilters = {
        ...state.globalFilters,
        [action.filterKey]: action.value,
      };


      // const globalFilter = passesGlobalFilters(globalFilters);
      // const transactions = state.allTransactions.filter((value: any, index: any) => globalFilter(value));

      return {
        ...state,
        globalFilters,
        // transactions,
      };
    }
    case SET_ACTIVE_TAB: {
      return {
        ...state,
        tab: action.value,
      };
    }
    default:
      return state;
  }
};
