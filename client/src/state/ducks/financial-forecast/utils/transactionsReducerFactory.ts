import Transaction from 'models/Transaction';
import { TransactionConfig } from 'models/Transaction/TransactionConfig';
import YYYYMMDD from 'utils/dateUtils/YYYYMMDD';
import getRandomString from 'utils/getRandomString';

import { FinancialForecastActions } from '../actions';
import updateTransaction from '../updateTransaction';
import {
  ADD_NEW_TRANSACTION,
  BULK_ADD_TRANSACTIONS,
  BULK_DELETE_TRANSACTIONS, BULK_DELETE_TRANSACTIONS_BY_ID,
  CLEAR_TRANSACTIONS,
  DELETE_TRANSACTION,
  DRAG_TRANSACTION,
  SELECT_ALL_TRANSACTIONS, SELECT_TRANSACTION, UNSELECT_ALL_TRANSACTIONS,
  UNSELECT_TRANSACTION, UPDATE_TRANSACTION,
  UPDATE_TRANSACTIONS_FILTERS,
} from './../types';
import checkTransactionDuplicatedFactory from './checkTransactionDuplicatedFactory';
import fixDatePartsPositionsFactory from './fixDatePartsPositionsFactory';
import getDatesPartsPositions from './getDatesPartsPositions';
import passesGlobalFilters from './passesGlobalFilters';

const updateTransactionInList = (transactions: TransactionConfig[], transactionIndex: number, payload: TransactionConfig) => [
  ...transactions.slice(0, transactionIndex),
  {
    ...transactions[transactionIndex],
    ...payload,
  },
  ...transactions.slice(transactionIndex + 1),
];

const removeTransactionInList = (transactions: TransactionConfig[], transactionIndex: number) => [
  ...transactions.slice(0, transactionIndex),
  ...transactions.slice(transactionIndex + 1),
];

const sortTransactions =
  (a: TransactionConfig, b: TransactionConfig) =>
    (a.startDate && b.startDate && new Date(a.startDate) > new Date(b.startDate) ? -1 : 1);

export default (key: string, transactionsKey: string, allTransactionsKey: string, filtersKey: string, selectedKey: string) =>
  (state: any, action: FinancialForecastActions): any => {
    if (!('key' in action) || action.key !== key) {
      return state;
    }

    switch (action.type) {
      case ADD_NEW_TRANSACTION: {
        const transaction: TransactionConfig = {
          id: getRandomString(),
          description: 'new transaction',
          credit: '0',
          debit: '0',
          totalValue: '0',
          particles: '1',
          interval: '1',
          visible: true,
        };

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

        const transactions = [transaction, ...state[transactionsKey]].sort(sortTransactions);
        const allTransactions = [transaction, ...state[allTransactionsKey]].sort(sortTransactions);

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
        }));

        const newTransactions = action.transactions
          .map((transaction: any) => ({
            ...Transaction.buildFromTransactionData(transaction).convertToTransactionData(),
            visible: true,
            tags: transaction.tags ? transaction.tags : [],
            wallet: transaction.wallet,
          }))
          .filter(checkTransactionDuplicatedFactory(state[allTransactionsKey]));

        const filteredTransactions = newTransactions.filter(passesGlobalFilters(state.globalFilters));

        const transactions = [...state[transactionsKey], ...filteredTransactions].sort(sortTransactions);
        const allTransactions = [...state[allTransactionsKey], ...newTransactions].sort(sortTransactions);

        return {
          ...state,
          [transactionsKey]: transactions,
          [allTransactionsKey]: allTransactions,
        };
      }
      case BULK_DELETE_TRANSACTIONS: {
        return {
          ...state,
          [transactionsKey]:
            state[transactionsKey].filter((transaction: TransactionConfig) => transaction.id && !state[selectedKey][transaction.id]),
          [allTransactionsKey]:
            state[allTransactionsKey].filter((transaction: TransactionConfig) => transaction.id && !state[selectedKey][transaction.id]),
          [selectedKey]: state[selectedKey].filter((v: boolean) => !v),
        };
      }
      case BULK_DELETE_TRANSACTIONS_BY_ID: {
        return {
          ...state,
          [transactionsKey]:
            state[transactionsKey].filter((transaction: TransactionConfig) => transaction.id && !action.ids.includes(transaction.id)),
          [allTransactionsKey]:
            state[allTransactionsKey].filter((transaction: TransactionConfig) => transaction.id && !action.ids.includes(transaction.id)),
        };
      }
      case UPDATE_TRANSACTION: {
        const { id, field, value } = action;

        const index = state[transactionsKey].map((transaction: TransactionConfig) => transaction.id).indexOf(id);
        let transactions = state[transactionsKey];

        if (index >= 0) {
          transactions = updateTransactionInList(state[transactionsKey], index, updateTransaction(field, value)(state[transactionsKey][index]));
        }

        if (!passesGlobalFilters(state.globalFilters)(transactions[index])) {
          transactions = removeTransactionInList(transactions, index);
        }

        const allTransactionsIndex = state[allTransactionsKey].map((transaction: TransactionConfig) => transaction.id).indexOf(id);
        let allTransactions = state[allTransactionsKey];

        if (allTransactionsIndex >= 0) {
          allTransactions =
            updateTransactionInList(
              state[allTransactionsKey],
              allTransactionsIndex,
              updateTransaction(field, value)(state[allTransactionsKey][allTransactionsIndex]),
            );
        }

        return {
          ...state,
          [transactionsKey]: transactions,
          [allTransactionsKey]: allTransactions,
        };
      }
      case DELETE_TRANSACTION: {
        const { id } = action;

        const index = state[transactionsKey].map((transaction: TransactionConfig) => transaction.id).indexOf(id);
        const transactions = removeTransactionInList(state[transactionsKey], index);

        const allTransactionsIndex = state[allTransactionsKey].map((transaction: TransactionConfig) => transaction.id).indexOf(id);
        const allTransactions = removeTransactionInList(state[allTransactionsKey], allTransactionsIndex);

        return {
          ...state,
          [transactionsKey]: transactions,
          [allTransactionsKey]: allTransactions,
        };
      }
      case CLEAR_TRANSACTIONS:
        return {
          ...state,
          [transactionsKey]: [],
          [allTransactionsKey]: [],
        };
        // case DRAG_TRANSACTION: {
        //   const { startIndex, endIndex } = action;
        //   const removedTransaction = state[transactionsKey].get(startIndex);
        //   let transactions = state[transactionsKey].remove(startIndex);

        //   transactions = transactions.splice(endIndex, 0, removedTransaction).toList();

      //   return {
      //     ...state,
      //     [transactionsKey]: transactions,
      //   };
      // }
      case UPDATE_TRANSACTIONS_FILTERS:
        return {
          ...state,
          [filtersKey]: action.filters,
          [selectedKey]: {},
        };
      case SELECT_TRANSACTION: {
        const selected = state[selectedKey] || {};

        return {
          ...state,
          [selectedKey]: {
            ...selected,
            [action.id]: true,
          },
        };
      }
      case UNSELECT_TRANSACTION: {
        const selected = state[selectedKey] || {};

        return {
          ...state,
          [selectedKey]: {
            ...selected,
            [action.id]: false,
          },
        };
      }
      case SELECT_ALL_TRANSACTIONS: {
        const transactions = state[transactionsKey];

        const selected = transactions.reduce((final: any, transaction: Transaction) => {
          final[transaction.id] = true;

          return final;
        }, {});

        return {
          ...state,
          [selectedKey]: selected,
        };
      }
      case UNSELECT_ALL_TRANSACTIONS: {
        return {
          ...state,
          [selectedKey]: {},
        };
      }
      default: return state;
    }
  };
