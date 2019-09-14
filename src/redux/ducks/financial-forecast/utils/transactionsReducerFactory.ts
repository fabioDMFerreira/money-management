import { FinancialForecastActions } from '../actions';
import updateTransaction from '../updateTransaction';
import { List } from 'immutable';
import getRandomString from 'utils/getRandomString';
import {
  ADD_NEW_TRANSACTION,
  BULK_ADD_TRANSACTIONS,
  UPDATE_TRANSACTION,
  DELETE_TRANSACTION,
  CLEAR_TRANSACTIONS,
  DRAG_TRANSACTION,
  UPDATE_TRANSACTIONS_FILTERS,
  BULK_DELETE_TRANSACTIONS,
} from '../types';
import YYYYMMDD from 'utils/YYYYMMDD';
import Transaction from 'models/Transaction';
import passesGlobalFilters from './passesGlobalFilters';
import TransactionDataInterface from 'models/ITransactionData';
import getDatesPartsPositions from './getDatesPartsPositions';
import fixDatePartsPositionsFactory from './fixDatePartsPositionsFactory';
import checkTransactionDuplicatedFactory from './checkTransactionDuplicatedFactory';

export default (key: string, transactionsKey: string, allTransactionsKey: string, filtersKey: string) => (state: any, action: FinancialForecastActions): any => {
  if (!('key' in action) || action.key !== key) {
    return state;
  }

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

      const transactions = state[transactionsKey].unshift(transaction);
      const allTransactions = state[allTransactionsKey].unshift(transaction);

      return {
        ...state,
        [transactionsKey]: transactions,
        [allTransactionsKey]: allTransactions,
      };
    }
    case BULK_ADD_TRANSACTIONS: {
      const dates = action.transactions.map(transaction => transaction.startDate);
      const datesPartsPositions = getDatesPartsPositions(dates);
      const fixDateParts = fixDatePartsPositionsFactory(datesPartsPositions);
      action.transactions = action.transactions.map(transaction => ({
        ...transaction,
        startDate: fixDateParts(transaction.startDate),
        endDate: fixDateParts(transaction.endDate),
      }))

      const newTransactions = action.transactions
        .map((transaction: any) => ({
          ...Transaction.buildFromTransactionData(transaction).convertToTransactionData(),
          visible: true,
          tags: transaction.tags ? transaction.tags : []
        }))
        .filter(checkTransactionDuplicatedFactory(state[allTransactionsKey]));

      const filteredTransactions = newTransactions.filter(passesGlobalFilters(state.globalFilters));

      const transactions = List<TransactionDataInterface>(state[transactionsKey].concat(filteredTransactions))
      const allTransactions = List<TransactionDataInterface>(state[allTransactionsKey].concat(newTransactions))

      return {
        ...state,
        [transactionsKey]: transactions,
        [allTransactionsKey]: allTransactions
      };
    }
    case BULK_DELETE_TRANSACTIONS: {
      return {
        ...state,
        [transactionsKey]: state[transactionsKey].filter((transaction: TransactionDataInterface) => !transaction.selected),
        [allTransactionsKey]: state[allTransactionsKey].filter((transaction: TransactionDataInterface) => !transaction.selected),
      }
    }
    case UPDATE_TRANSACTION: {
      const { id, field, value } = action;

      const index = state[transactionsKey].findIndex((transaction: any) => transaction.id === id);
      let transactions = state[transactionsKey].update(index, updateTransaction(field, value))

      if (!passesGlobalFilters(state.globalFilters)(transactions.get(index))) {
        transactions = transactions.remove(index);
      }

      const allTransactionsIndex = state[allTransactionsKey].findIndex((transaction: any) => transaction.id === id);
      const allTransactions = state[allTransactionsKey].update(allTransactionsIndex, updateTransaction(field, value))

      return {
        ...state,
        [transactionsKey]: transactions,
        [allTransactionsKey]: allTransactions
      }
    }
    case DELETE_TRANSACTION: {
      const { id } = action;

      const index = state[transactionsKey].findIndex((transaction: any) => transaction.id === id);
      const transactions = state[transactionsKey].remove(index);

      const allTransactionsIndex = state[allTransactionsKey].findIndex((transaction: any) => transaction.id === id);
      const allTransactions = state[allTransactionsKey].remove(allTransactionsIndex);

      return {
        ...state,
        [transactionsKey]: transactions,
        [allTransactionsKey]: allTransactions,
      };
    }
    case CLEAR_TRANSACTIONS:
      return {
        ...state,
        [transactionsKey]: List<TransactionDataInterface>(),
        [allTransactionsKey]: List<TransactionDataInterface>()
      }
    case DRAG_TRANSACTION:
      const { startIndex, endIndex } = action;
      const removedTransaction = state[transactionsKey].get(startIndex);
      let transactions = state[transactionsKey].remove(startIndex);

      transactions = transactions.splice(endIndex, 0, removedTransaction).toList();

      return {
        ...state,
        [transactionsKey]: transactions
      };
    case UPDATE_TRANSACTIONS_FILTERS:
      return {
        ...state,
        [filtersKey]: action.filters,
      }
  }
}
