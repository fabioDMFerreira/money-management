import { List, Map } from 'immutable';

import {
  ADD_NEW_TRANSACTION,
  BULK_ADD_TRANSACTIONS,
  UPDATE_TRANSACTION,
  DELETE_TRANSACTION,
  CLEAR_TRANSACTIONS,
  DRAG_TRANSACTION,
  CREATE_TAG,
  UPDATE_TRANSACTIONS_FILTERS,
  UPDATE_FORECAST,
  SET_ACTIVE_TAB,
  UPDATE_GLOBAL_FILTER
} from './FinancialForecastActionTypes';
import { FinancialForecastActions, filterType } from './FinancialForecastActions';
import TransactionDataInterface from './TransactionDataInterface';
import YYYYMMDD from 'utils/YYYYMMDD';
import Transaction from './services/Transaction.class';
import getRandomString from 'utils/getRandomString';
import { TagType } from './TagType';
import { ForecastDataInterface } from './ForecastDataInterface';
import { sumMonths } from './services/utils';
import { GlobalFiltersType } from './containers/GlobalFilters/GlobalFiltersType';
import transactionEditableFields from './transactionEditableFields';

export type State = {
  transactions: List<TransactionDataInterface>
  allTransactions: List<TransactionDataInterface>
  tags: List<TagType>
  filters: filterType[]
  forecast: ForecastDataInterface
  tab: string
  globalFilters: GlobalFiltersType
}

export const initialState: State = {
  transactions: List<TransactionDataInterface>([]),
  allTransactions: List<TransactionDataInterface>([]),
  tags: List<TagType>([]),
  filters: [],
  forecast: {
    initialValue: '0',
    startDate: YYYYMMDD(new Date()),
    endDate: YYYYMMDD(sumMonths(new Date(), 12)),
  },
  tab: 'transactions',
  globalFilters: {}
}

const passesGlobalFilters = (globalFilters: GlobalFiltersType) => (transaction: TransactionDataInterface) => {
  let matchesStartDate = true;
  let matchesEndDate = true;
  let matchesTags = true;

  if (globalFilters.startDate && transaction.startDate) {
    matchesStartDate = new Date(transaction.startDate) >= new Date(globalFilters.startDate);
  } else if (globalFilters.startDate && !transaction.startDate) {
    matchesStartDate = false;
  }

  if (globalFilters.endDate && transaction.endDate) {
    matchesEndDate = new Date(transaction.endDate) <= new Date(globalFilters.endDate);
  } else if (globalFilters.endDate && !transaction.endDate) {
    matchesEndDate = false;
  }

  if (globalFilters.tags && globalFilters.tags.length && transaction.tags) {
    const globalTagsIds = globalFilters.tags.map(tag => tag.value);
    matchesTags = transaction.tags.some(tag => globalTagsIds.includes(tag.value));

    if(globalTagsIds.includes('null') && (!transaction.tags || !transaction.tags.length)){
      matchesTags = true;
    }
  }

  return matchesStartDate && matchesEndDate && matchesTags;
}

const updateTransaction = (field: transactionEditableFields, value: any) => (transaction: TransactionDataInterface) => {

  switch (field) {
    case 'visible':
      return {
        ...transaction,
        visible: value
      }
    case 'description':
      return {
        ...transaction,
        description: value,
      };
    case 'tags':
      return {
        ...transaction,
        tags: value
      }
    default:
      break
  }

  const transactionDB: Transaction = Transaction.buildFromTransactionData(transaction);

  switch (field) {
    case 'credit':
      transactionDB.value = +value;
      break;
    case 'debit':
      transactionDB.value = -(+value);
      break;
    case 'startDate':
      transactionDB.startDate = value ? new Date(value) : new Date();
      break;
    case 'endDate':
      transactionDB.endDate = value ? new Date(value) : new Date();
      break;
    case 'particles':
      transactionDB.particles = +value;
      break;
    case 'interval':
      transactionDB.interval = +value;
      break;
    default:
      break;
  }

  return {
    ...transaction,
    ...transactionDB.convertToTransactionData()
  }
}
export default (state: State = initialState, action: FinancialForecastActions): State => {
  switch (action.type) {
    case ADD_NEW_TRANSACTION: {
      const transaction: TransactionDataInterface = {
        id: getRandomString(),
        description: 'new transaction',
        credit: '0',
        debit: '0',
        totalValue: '0',
        particles: '1',
        interval: '1',
        visible: true,
      }

      if (state.globalFilters.startDate) {
        transaction.startDate = state.globalFilters.startDate;
      } else if (state.globalFilters.endDate) {
        transaction.startDate = state.globalFilters.endDate;
      } else {
        transaction.startDate = YYYYMMDD(new Date());
      }

      if (state.globalFilters.tags) {
        transaction.tags = state.globalFilters.tags;
      } else {
        transaction.tags = [];
      }

      const transactions = state.transactions.unshift(transaction);
      const allTransactions = state.allTransactions.unshift(transaction);

      return {
        ...state,
        transactions,
        allTransactions,
      };
    }
    case BULK_ADD_TRANSACTIONS: {
      const newTransactions = action.transactions.map(transaction => ({
        ...Transaction.buildFromTransactionData(transaction).convertToTransactionData(),
        visible: true,
        tags: transaction.tags ? transaction.tags : []
      }));

      const filteredTransactions = newTransactions.filter(passesGlobalFilters(state.globalFilters));

      const transactions = List<TransactionDataInterface>(state.transactions.concat(filteredTransactions))
      const allTransactions = List<TransactionDataInterface>(state.transactions.concat(newTransactions))


      return {
        ...state,
        transactions,
        allTransactions
      };
    }
    case UPDATE_TRANSACTION: {
      const { id, field, value } = action;

      const index = state.transactions.findIndex((transaction: any) => transaction.id === id);
      let transactions = state.transactions.update(index, updateTransaction(field, value))

      if (!passesGlobalFilters(state.globalFilters)(transactions.get(index))) {
        transactions = transactions.remove(index);
      }

      const allTransactionsIndex = state.allTransactions.findIndex((transaction: any) => transaction.id === id);
      const allTransactions = state.allTransactions.update(allTransactionsIndex, updateTransaction(field, value))

      return {
        ...state,
        transactions,
        allTransactions
      }
    }
    case DELETE_TRANSACTION: {
      const { id } = action;

      const index = state.transactions.findIndex((transaction: any) => transaction.id === id);
      const transactions = state.transactions.remove(index);

      const allTransactionsIndex = state.allTransactions.findIndex((transaction: any) => transaction.id === id);
      const allTransactions = state.allTransactions.remove(allTransactionsIndex);

      return {
        ...state,
        transactions,
        allTransactions,
      };
    }
    case CLEAR_TRANSACTIONS:
      return {
        ...state,
        transactions: List<TransactionDataInterface>(),
        allTransactions: List<TransactionDataInterface>()
      }
    case DRAG_TRANSACTION:
      const { startIndex, endIndex } = action;
      const removedTransaction = state.transactions.get(startIndex);
      let transactions = state.transactions.remove(startIndex);

      transactions = transactions.splice(endIndex, 0, removedTransaction).toList();

      return {
        ...state,
        transactions
      };
    case CREATE_TAG: {
      const { tag } = action;

      return {
        ...state,
        tags: state.tags.push(tag)
      }
    }
    case UPDATE_TRANSACTIONS_FILTERS:
      return {
        ...state,
        filters: action.filters,
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
    default:
      return state;
  }
}
