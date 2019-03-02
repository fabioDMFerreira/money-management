import { List } from 'immutable';

import {
  ADD_NEW_TRANSACTION,
  BULK_ADD_TRANSACTIONS,
  UPDATE_TRANSACTION,
  DELETE_TRANSACTION,
  CLEAR_TRANSACTIONS,
  DRAG_TRANSACTION
} from './FinancialForecastActionTypes';
import { FinancialForecastActions } from './FinancialForecastActions';
import TransactionDataInterface from './TransactionDataInterface';
import YYYYMMDD from 'utils/YYYYMMDD';
import Transaction from './Balance/Transaction.class';
import getRandomString from 'utils/getRandomString';

type State = {
  transactions: List<TransactionDataInterface>
}

const initialState: State = {
  transactions: List<TransactionDataInterface>([]),
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
        startDate: YYYYMMDD(new Date()),
        visible: true,
      }
      const transactions = state.transactions.unshift(transaction);

      return {
        ...state,
        transactions,
      };
    }
    case BULK_ADD_TRANSACTIONS: {
      const newTransactions = action.transactions.map(transaction => ({
        ...Transaction.buildFromTransactionData(transaction).convertToTransactionData(),
        visible: true,
      }));
      const transactions = List<TransactionDataInterface>(state.transactions.concat(newTransactions))

      return {
        ...state,
        transactions,
      };
    }
    case UPDATE_TRANSACTION: {
      const { id, field, value } = action;
      const index = state.transactions.findIndex((transaction: any) => transaction.id === id);

      const transactions = state.transactions.update(index, transaction => {

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

        return transactionDB.convertToTransactionData();
      })

      return {
        ...state,
        transactions,
      }
    }
    case DELETE_TRANSACTION: {
      const { id } = action;
      const index = state.transactions.findIndex((transaction: any) => transaction.id === id);
      const transactions = state.transactions.remove(index);

      return {
        ...state,
        transactions,
      };
    }
    case CLEAR_TRANSACTIONS:
      return {
        ...state,
        transactions: List<TransactionDataInterface>()
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
    default:
      return state;
  }
}
