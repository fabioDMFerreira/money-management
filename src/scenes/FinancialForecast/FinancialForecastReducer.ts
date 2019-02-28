import { List } from 'immutable';

import {
  ADD_NEW_TRANSACTION,
  BULK_ADD_TRANSACTIONS,
  UPDATE_TRANSACTION,
  DELETE_TRANSACTION,
  CLEAR_TRANSACTIONS
} from './FinancialForecastActionTypes';
import Transaction from './Balance/Transaction.class';
import { FinancialForecastActions } from './FinancialForecastActions';

type State = {
  transactions: List<Transaction>
}

const initialState: State = {
  transactions: List<Transaction>([]),
}

export default (state: State = initialState, action: FinancialForecastActions): State => {
  switch (action.type) {
    case ADD_NEW_TRANSACTION: {
      const transaction = new Transaction("New Transaction", 0, new Date());
      const transactions = state.transactions.unshift(transaction);

      return {
        ...state,
        transactions,
      };
    }
    case BULK_ADD_TRANSACTIONS: {
      const newTransactions = action.transactions.map(transaction => Transaction.buildFromTransactionData(transaction));
      const transactions = List<Transaction>(state.transactions.concat(newTransactions))

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
          case 'credit':
            transaction.value = +value;
            break;
          case 'debit':
            transaction.value = -(+value);
            break;
          case 'startDate':
            transaction.startDate = value ? new Date(value) : new Date();
            break;
          case 'endDate':
            transaction.endDate = value ? new Date(value) : new Date();
            break;
          case 'description':
            transaction.description = value;
            break;
          case 'particles':
            transaction.particles = +value;
            break;
          case 'interval':
            transaction.interval = +value;
            break;
          default:
            break;
        }
        return transaction;
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
        transactions: List<Transaction>()
      }
    default:
      return state;
  }
}
