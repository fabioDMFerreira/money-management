import { RecurringTransactionConfig } from 'models/RecurringTransaction';

import { BudgetsActions } from './budgetsActions';
import { CREATE_BUDGET, REMOVE_BUDGET, UPDATE_BUDGET } from './budgetsTypes';

export interface BudgetsState {
  budgets: RecurringTransactionConfig[];
}

const initialState: BudgetsState = {
  budgets: [],
};

export default (state: BudgetsState = initialState, action: BudgetsActions): BudgetsState => {
  switch (action.type) {
    case CREATE_BUDGET: {
      return {
        ...state,
        budgets: [...state.budgets, action.payload],
      };
    }
    case UPDATE_BUDGET: {
      const contractIndex = state.budgets.findIndex((contract: any) => contract.id === action.id);

      if (contractIndex < 0) {
        return state;
      }

      const budgets = [
        ...state.budgets.slice(0, contractIndex),
        {
          ...state.budgets[contractIndex],
          ...action.payload,
        },
        ...state.budgets.slice(contractIndex + 1),
      ];

      return {
        ...state,
        budgets,
      };
    }
    case REMOVE_BUDGET: {
      const contractIndex = state.budgets.findIndex((contract: any) => contract.id === action.id);

      if (contractIndex < 0) {
        return state;
      }

      const budgets = [
        ...state.budgets.slice(0, contractIndex),
        ...state.budgets.slice(contractIndex + 1),
      ];

      return {
        ...state,
        budgets,
      };
    }
    default: {
      return state;
    }
  }
};
