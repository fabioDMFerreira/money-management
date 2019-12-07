import randomColor from 'randomcolor';
import { List, Map } from 'immutable';

import { TRANSACTIONS, ESTIMATES } from './consts';

import YYYYMMDD from 'utils/YYYYMMDD';
import TransactionDataInterface from 'models/Transaction/TransactionConfig';
import { Tag } from 'models/Tag';
import { ForecastConfig } from 'models/Forecast/ForecastConfig';
import { sumMonths } from 'models/utils';
import { GlobalFilters } from 'models/GlobalFilters';

import {
  UPDATE_FORECAST,
  SET_ACTIVE_TAB,
  UPDATE_GLOBAL_FILTER,
} from './types';
import { FinancialForecastActions, filterType } from './actions';

import passesGlobalFilters from './utils/passesGlobalFilters';
import transactionsReducerHoc from './utils/transactionsReducerFactory';

export type State = {
  transactions: List<TransactionDataInterface>
  allTransactions: List<TransactionDataInterface>
  filters: filterType[]
  estimatesTransactions: List<TransactionDataInterface>
  estimatesAllTransactions: List<TransactionDataInterface>
  estimatesFilters: filterType[]
  forecast: ForecastConfig
  tab: string
  globalFilters: GlobalFilters,
  selected: Map<string, boolean>,
  estimatesSelected: Map<string, boolean>
}

export const initialState: State = {
  transactions: List<TransactionDataInterface>([]),
  allTransactions: List<TransactionDataInterface>([]),
  filters: [],
  estimatesTransactions: List<TransactionDataInterface>([]),
  estimatesAllTransactions: List<TransactionDataInterface>([]),
  estimatesFilters: [],
  forecast: {
    initialValue: '0',
    startDate: YYYYMMDD(new Date()),
    endDate: YYYYMMDD(sumMonths(new Date(), 12)),
  },
  tab: 'transactions',
  globalFilters: {},
  selected: Map(),
  estimatesSelected: Map()
}

const removeTag = (tag: Tag) => {
  return (transaction: any) => {
    if (transaction.tags && transaction.tags.length) {
      const tagIndex = transaction.tags.map((tag: any) => tag.id).indexOf(tag.id);

      if (tagIndex >= 0) {
        transaction.tags.splice(tagIndex, 1);
      }
    }

    return transaction;
  }
}

const updateTag = (tag: Tag, newTag: Tag) => {
  return (transaction: any) => {
    if (transaction.tags && transaction.tags.length) {
      const tagIndex = transaction.tags.map((tag: any) => tag.id).indexOf(tag.id);

      if (tagIndex >= 0) {
        transaction.tags[tagIndex] = newTag;
      }
    }

    return transaction;
  }
}


const transactionsReducer = transactionsReducerHoc(TRANSACTIONS, 'transactions', 'allTransactions', 'filters', 'selected');
const estimatesReducer = transactionsReducerHoc(ESTIMATES, 'estimatesTransactions', 'estimatesAllTransactions', 'estimatesFilters', 'estimatesSelected');

export default (state: State = initialState, action: FinancialForecastActions): State => {


  state = transactionsReducer(state, action);
  state = estimatesReducer(state, action);

  switch (action.type) {
    case UPDATE_GLOBAL_FILTER: {
      const globalFilters = {
        ...state.globalFilters,
        [action.filterKey]: action.value
      };


      const globalFilter = passesGlobalFilters(globalFilters);
      const transactions = state.allTransactions.filter((value: any, index: any) => {
        return globalFilter(value);
      }).toList();

      return {
        ...state,
        globalFilters,
        transactions,
      }
    }
    case UPDATE_FORECAST: {
      return {
        ...state,
        forecast: {
          ...state.forecast,
          [action.keyName]: action.value
        }
      }
    }
    case SET_ACTIVE_TAB: {
      return {
        ...state,
        tab: action.value,
      }
    }
    default:
      return state;
  }
}
