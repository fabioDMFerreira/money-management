import { List } from 'immutable';
import { RecurringTransactionConfig } from 'models/RecurringTransaction';

import { BudgetsActions } from './budgetsActions';
import { CREATE_BUDGET, REMOVE_BUDGET, UPDATE_BUDGET } from './budgetsTypes';

export interface BudgetsState {
  budgets: List<RecurringTransactionConfig>;
}

const initialState: BudgetsState = {
  budgets: List<RecurringTransactionConfig>([]),
};

export default (state: BudgetsState = initialState, action: BudgetsActions): BudgetsState => {
  switch (action.type) {
    case CREATE_BUDGET: {
      return {
        ...state,
        budgets: state.budgets.push(action.payload),
      };
    }
    case UPDATE_BUDGET: {
      const contractIndex = state.budgets.findIndex((contract: any) => contract.id === action.id);

      if (contractIndex < 0) {
        return state;
      }

      return {
        ...state,
        budgets: state.budgets.update(
          contractIndex,
          (contract: RecurringTransactionConfig) => ({
            ...contract,
            ...action.payload,
          }),
        ),
      };
    }
    case REMOVE_BUDGET: {
      const contractIndex = state.budgets.findIndex((contract: any) => contract.id === action.id);

      if (contractIndex < 0) {
        return state;
      }

      return {
        ...state,
        budgets: state.budgets.remove(contractIndex),
      };
    }
    default: {
      return state;
    }
  }
};
