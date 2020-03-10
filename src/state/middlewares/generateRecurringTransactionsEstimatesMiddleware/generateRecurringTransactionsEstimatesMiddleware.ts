import { RecurringTransaction } from 'models/RecurringTransaction';
import { CREATE_CONTRACT, REMOVE_CONTRACT, UPDATE_CONTRACT } from 'state/ducks/contracts/contractsTypes';
import { bulkAddTransactions, bulkDeleteTransactionsById } from 'state/reducerFactory/transactionsReducerFactory/transactionsActionsFactory';
import { ESTIMATES } from 'state/reducerFactory/transactionsReducerFactory/transactionsReducersKeys';

import { BudgetsActions } from './../../ducks/budgets/budgetsActions';
import { getBudgetById } from './../../ducks/budgets/budgetsSelectors';
import { CREATE_BUDGET, REMOVE_BUDGET, UPDATE_BUDGET } from './../../ducks/budgets/budgetsTypes';
import { ContractsActions } from './../../ducks/contracts/contractsActions';
import { getContractById } from './../../ducks/contracts/contractsSelectors';

export default (store: any) => (dispatch: any) => (action: ContractsActions | BudgetsActions) => {
  switch (action.type) {
    case CREATE_CONTRACT: {
      const rt = new RecurringTransaction(action.payload);
      const transactions = rt.generateTransactions();
      const bulkAddTransactionsAction = bulkAddTransactions(ESTIMATES)(transactions);

      action.payload.transactionsIds = transactions.map(transaction => transaction.id || '');

      dispatch(bulkAddTransactionsAction);
      break;
    }
    case CREATE_BUDGET: {
      const rt = new RecurringTransaction(action.payload);
      const transactions = rt.generateTransactions();
      const bulkAddTransactionsAction = bulkAddTransactions(ESTIMATES)(transactions);

      action.payload.transactionsIds = transactions.map(transaction => transaction.id || '');

      dispatch(bulkAddTransactionsAction);
      break;
    }
    case UPDATE_CONTRACT: {
      const contract = getContractById(store.getState(), action.id);

      if (!contract) {
        return;
      }

      if (contract.transactionsIds) {
        dispatch(bulkDeleteTransactionsById(ESTIMATES)(contract.transactionsIds));
      }

      const rt = new RecurringTransaction(action.payload);
      const transactions = rt.generateTransactions();
      const bulkAddTransactionsAction = bulkAddTransactions(ESTIMATES)(transactions);

      action.payload.transactionsIds = transactions.map(transaction => transaction.id || '');

      dispatch(bulkAddTransactionsAction);
      break;
    }
    case UPDATE_BUDGET: {
      const budget = getBudgetById(store.getState(), action.id);

      if (!budget) {
        return;
      }

      if (budget.transactionsIds) {
        dispatch(bulkDeleteTransactionsById(ESTIMATES)(budget.transactionsIds));
      }

      const rt = new RecurringTransaction(action.payload);
      const transactions = rt.generateTransactions();
      const bulkAddTransactionsAction = bulkAddTransactions(ESTIMATES)(transactions);

      action.payload.transactionsIds = transactions.map(transaction => transaction.id || '');

      dispatch(bulkAddTransactionsAction);
      break;
    }
    case REMOVE_CONTRACT: {
      const contract = getContractById(store.getState(), action.id);

      if (!contract) {
        return;
      }

      if (contract.transactionsIds) {
        dispatch(bulkDeleteTransactionsById(ESTIMATES)(contract.transactionsIds));
      }

      break;
    }
    case REMOVE_BUDGET: {
      const budget = getBudgetById(store.getState(), action.id);

      if (!budget) {
        return;
      }

      if (budget.transactionsIds) {
        dispatch(bulkDeleteTransactionsById(ESTIMATES)(budget.transactionsIds));
      }

      break;
    }
    default: {
      break;
    }
  }

  dispatch(action);
};
