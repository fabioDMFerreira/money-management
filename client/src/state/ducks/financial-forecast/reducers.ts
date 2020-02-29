
import { List, Map } from 'immutable';
import { ForecastConfig } from 'models/Forecast/ForecastConfig';
import { GlobalFilters } from 'models/GlobalFilters';
import { TransactionConfig } from 'models/Transaction/TransactionConfig';
import { sumMonths } from 'utils/dateUtils/dateUtils';
import YYYYMMDD from 'utils/dateUtils/YYYYMMDD';

import { filterType, FinancialForecastActions } from './actions';
import { ESTIMATES, TRANSACTIONS } from './consts';
import {
  SET_ACTIVE_TAB,
  UPDATE_FORECAST,
  UPDATE_GLOBAL_FILTER,
} from './types';
import passesGlobalFilters from './utils/passesGlobalFilters';
import transactionsReducerHoc from './utils/transactionsReducerFactory';


export type State = {
  transactions: List<TransactionConfig>;
  allTransactions: List<TransactionConfig>;
  filters: filterType[];
  estimatesTransactions: List<TransactionConfig>;
  estimatesAllTransactions: List<TransactionConfig>;
  estimatesFilters: filterType[];
  forecast: ForecastConfig;
  tab: string;
  globalFilters: GlobalFilters;
  selected: Map<string, boolean>;
  estimatesSelected: Map<string, boolean>;
}

export const initialState: State = {
  transactions: List<TransactionConfig>([]),
  allTransactions: List<TransactionConfig>([]),
  filters: [],
  estimatesTransactions: List<TransactionConfig>([]),
  estimatesAllTransactions: List<TransactionConfig>([]),
  estimatesFilters: [],
  forecast: {
    initialValue: '0',
    startDate: YYYYMMDD(new Date()),
    endDate: YYYYMMDD(sumMonths(new Date(), 12)),
  },
  tab: 'transactions',
  globalFilters: {},
  selected: Map(),
  estimatesSelected: Map(),
};

const transactionsReducer = transactionsReducerHoc(TRANSACTIONS, 'transactions', 'allTransactions', 'filters', 'selected');
const estimatesReducer =
  transactionsReducerHoc(ESTIMATES, 'estimatesTransactions', 'estimatesAllTransactions', 'estimatesFilters', 'estimatesSelected');

export default (state: State = initialState, action: FinancialForecastActions): State => {
  state = transactionsReducer(state, action);
  state = estimatesReducer(state, action);

  switch (action.type) {
    case UPDATE_GLOBAL_FILTER: {
      const globalFilters = {
        ...state.globalFilters,
        [action.filterKey]: action.value,
      };


      const globalFilter = passesGlobalFilters(globalFilters);
      const transactions = state.allTransactions.filter((value: any, index: any) => globalFilter(value)).toList();

      return {
        ...state,
        globalFilters,
        transactions,
      };
    }
    case UPDATE_FORECAST: {
      return {
        ...state,
        forecast: {
          ...state.forecast,
          [action.keyName]: action.value,
        },
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
