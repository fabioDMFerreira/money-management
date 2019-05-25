import { TRANSACTIONS, ESTIMATES } from './consts';
import { List } from 'immutable';

import {

  CREATE_TAG,
  UPDATE_FORECAST,
  SET_ACTIVE_TAB,
  UPDATE_GLOBAL_FILTER,
  DELETE_TAG,
  UPDATE_TAG
} from './FinancialForecastActionTypes';
import { FinancialForecastActions, filterType } from './FinancialForecastActions';
import TransactionDataInterface from '../TransactionDataInterface';
import YYYYMMDD from 'utils/YYYYMMDD';
import { TagType } from '../TagType';
import { ForecastDataInterface } from '../ForecastDataInterface';
import { sumMonths } from '../services/utils';
import { GlobalFiltersType } from '../containers/GlobalFilters/GlobalFiltersType';
import passesGlobalFilters from './passesGlobalFilters';
import transactionsReducerHoc from './transactionsReducerHoc';

export type State = {
  transactions: List<TransactionDataInterface>
  allTransactions: List<TransactionDataInterface>
  filters: filterType[]
  estimatesTransactions: List<TransactionDataInterface>
  estimatesAllTransactions: List<TransactionDataInterface>
  estimatesFilters: filterType[]
  tags: List<TagType>
  forecast: ForecastDataInterface
  tab: string
  globalFilters: GlobalFiltersType
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
  tags: List<TagType>([]),
  tab: 'transactions',
  globalFilters: {}
}

const removeTag = (tag: TagType) => {
  return (transaction: any) => {
    if (transaction.tags && transaction.tags.length) {
      const tagIndex = transaction.tags.map((tag: any) => tag.value).indexOf(tag.value);

      if (tagIndex >= 0) {
        transaction.tags.splice(tagIndex, 1);
      }
    }

    return transaction;
  }
}

const updateTag = (tag: TagType, newTag: TagType) => {
  return (transaction: any) => {
    if (transaction.tags && transaction.tags.length) {
      const tagIndex = transaction.tags.map((tag: any) => tag.value).indexOf(tag.value);

      if (tagIndex >= 0) {
        transaction.tags[tagIndex] = newTag;
      }
    }

    return transaction;
  }
}


const transactionsReducer = transactionsReducerHoc(TRANSACTIONS, 'transactions', 'allTransactions', 'filters');
const estimatesReducer = transactionsReducerHoc(ESTIMATES, 'estimatesTransactions', 'estimatesAllTransactions', 'estimatesFilters');

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
          [action.keyName]: [action.value]
        }
      }
    }
    case SET_ACTIVE_TAB: {
      return {
        ...state,
        tab: action.value,
      }
    }
    case CREATE_TAG: {
      const { tag } = action;

      return {
        ...state,
        tags: state.tags.push(tag)
      }
    }
    case DELETE_TAG: {
      const transactions = state.transactions.map(removeTag(action.tag)).toList();
      const allTransactions = state.transactions.map(removeTag(action.tag)).toList();

      const tags = state.tags
        .filter((tag: any) => tag.value !== action.tag.value)
        .toList();

      return {
        ...state,
        transactions,
        allTransactions,
        tags
      }
    }
    case UPDATE_TAG: {
      const transactions = state.transactions.map(updateTag(action.tag, action.newTag)).toList();
      const allTransactions = state.transactions.map(updateTag(action.tag, action.newTag)).toList();

      const tags = state.tags
        .map((tag: any) => tag.value === action.tag.value ? action.newTag : tag)
        .toList();

      return {
        ...state,
        transactions,
        allTransactions,
        tags
      }
    }
    default:
      return state;
  }
}
