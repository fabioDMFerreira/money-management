import Transaction from 'models/Transaction';
import { TransactionConfig } from 'models/Transaction/TransactionConfig';
import YYYYMMDD from 'utils/dateUtils/YYYYMMDD';
import getRandomString from 'utils/getRandomString';

import { filterType, FinancialForecastActions } from './transactionsActionsFactory';
import {
  ADD_NEW_TRANSACTION,
  BULK_ADD_TRANSACTIONS,
  BULK_DELETE_TRANSACTIONS, BULK_DELETE_TRANSACTIONS_BY_ID,
  CLEAR_TRANSACTIONS,
  DELETE_TRANSACTION,
  SELECT_ALL_TRANSACTIONS, SELECT_TRANSACTION, UNSELECT_ALL_TRANSACTIONS,
  UNSELECT_TRANSACTION, UPDATE_TRANSACTION,
  UPDATE_TRANSACTIONS_FILTERS,
} from './transactionsTypes';
import fixDatePartsPositionsFactory from './utils/fixDatePartsPositionsFactory';
import getDatesPartsPositions from './utils/getDatesPartsPositions';
import isTransactionDuplicatedFactory from './utils/isTransactionDuplicatedFactory';
import updateTransaction from './utils/updateTransaction';

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

export interface TransactionsState {
  transactions: TransactionConfig[];
  allTransactions: TransactionConfig[];
  filters: filterType[];
  selected: { [key: string]: boolean };
}

export const transactionsInitialState = {
  transactions: [],
  allTransactions: [],
  filters: [],
  selected: {},
};

export default (key: string) =>
  (state: TransactionsState = transactionsInitialState, action: FinancialForecastActions): any => {
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

        // if (state.globalFilters.startDate) {
        //   transaction.startDate = state.globalFilters.startDate;
        // } else if (state.globalFilters.endDate) {
        //   transaction.startDate = state.globalFilters.endDate;
        // } else {
        //   transaction.startDate = YYYYMMDD(new Date());
        // }

        transaction.startDate = YYYYMMDD(new Date());

        // if (state.globalFilters.tags) {
        //   transaction.tags = state.globalFilters.tags;
        // } else {
        //   transaction.tags = [];
        // }

        transaction.tags = [];

        const transactions = [transaction, ...state.transactions].sort(sortTransactions);
        const allTransactions = [transaction, ...state.allTransactions].sort(sortTransactions);

        return {
          ...state,
          transactions,
          allTransactions,
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
        const isDuplicated = isTransactionDuplicatedFactory(state.allTransactions);

        const newTransactions = action.transactions
          .map((transaction: any) => ({
            ...Transaction.buildFromTransactionData(transaction).convertToTransactionData(),
            visible: true,
            tags: transaction.tags ? transaction.tags : [],
            wallet: transaction.wallet,
          }))
          .filter(t => !isDuplicated(t));

        // const filteredTransactions = newTransactions.filter(passesGlobalFilters(state.globalFilters));

        const transactions = [...state.transactions, ...newTransactions].sort(sortTransactions);
        const allTransactions = [...state.allTransactions, ...newTransactions].sort(sortTransactions);

        return {
          ...state,
          transactions,
          allTransactions,
        };
      }
      case BULK_DELETE_TRANSACTIONS: {
        return {
          ...state,
          transactions:
            state.transactions.filter((transaction: TransactionConfig) => transaction.id && !state.selected[transaction.id]),
          allTransactions:
            state.allTransactions.filter((transaction: TransactionConfig) => transaction.id && !state.selected[transaction.id]),
          selected: {},
        };
      }
      case BULK_DELETE_TRANSACTIONS_BY_ID: {
        return {
          ...state,
          transactions:
            state.transactions.filter((transaction: TransactionConfig) => transaction.id && !action.ids.includes(transaction.id)),
          allTransactions:
            state.allTransactions.filter((transaction: TransactionConfig) => transaction.id && !action.ids.includes(transaction.id)),
        };
      }
      case UPDATE_TRANSACTION: {
        const { id, field, value } = action;

        const index = state.transactions.map((transaction: TransactionConfig) => transaction.id).indexOf(id);
        let { transactions } = state;

        if (index >= 0) {
          transactions = updateTransactionInList(state.transactions, index, updateTransaction(field, value)(state.transactions[index]));
        }

        // if (!passesGlobalFilters(state.globalFilters)(transactions[index])) {
        //   transactions = removeTransactionInList(transactions, index);
        // }

        const allTransactionsIndex = state.allTransactions.map((transaction: TransactionConfig) => transaction.id).indexOf(id);
        let { allTransactions } = state;

        if (allTransactionsIndex >= 0) {
          allTransactions =
            updateTransactionInList(
              state.allTransactions,
              allTransactionsIndex,
              updateTransaction(field, value)(state.allTransactions[allTransactionsIndex]),
            );
        }

        return {
          ...state,
          transactions,
          allTransactions,
        };
      }
      case DELETE_TRANSACTION: {
        const { id } = action;

        const index = state.transactions.map((transaction: TransactionConfig) => transaction.id).indexOf(id);
        const transactions = removeTransactionInList(state.transactions, index);

        const allTransactionsIndex = state.allTransactions.map((transaction: TransactionConfig) => transaction.id).indexOf(id);
        const allTransactions = removeTransactionInList(state.allTransactions, allTransactionsIndex);

        return {
          ...state,
          transactions,
          allTransactions,
        };
      }
      case CLEAR_TRANSACTIONS:
        return {
          ...state,
          transactions: [],
          allTransactions: [],
        };
        // case DRAG_TRANSACTION: {
        //   const { startIndex, endIndex } = action;
        //   const removedTransaction = state.transactions.get(startIndex);
        //   let transactions = state.transactions.remove(startIndex);

        //   transactions = transactions.splice(endIndex, 0, removedTransaction).toList();

      //   return {
      //     ...state,
      //     transactions: transactions,
      //   };
      // }
      case UPDATE_TRANSACTIONS_FILTERS:
        return {
          ...state,
          filters: action.filters,
          selected: {},
        };
      case SELECT_TRANSACTION: {
        const selected = state.selected || {};

        return {
          ...state,
          selected: {
            ...selected,
            [action.id]: true,
          },
        };
      }
      case UNSELECT_TRANSACTION: {
        const selected = state.selected || {};

        return {
          ...state,
          selected: {
            ...selected,
            [action.id]: false,
          },
        };
      }
      case SELECT_ALL_TRANSACTIONS: {
        const { transactions } = state;

        const selected = transactions.reduce((final: { [v: string]: boolean }, transaction: TransactionConfig) => {
          if (transaction.id) {
            final[transaction.id] = true;
          }

          return final;
        }, {});

        return {
          ...state,
          selected,
        };
      }
      case UNSELECT_ALL_TRANSACTIONS: {
        return {
          ...state,
          selected: {},
        };
      }
      default: return state;
    }
  };
