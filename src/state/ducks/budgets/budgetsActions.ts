import { RecurringTransactionConfig } from 'models/RecurringTransaction';

import { CREATE_BUDGET, REMOVE_BUDGET, UPDATE_BUDGET } from './budgetsTypes';


interface CreateBudgetAction {
  type: typeof CREATE_BUDGET;
  payload: RecurringTransactionConfig;
}

interface UpdateBudgetAction {
  type: typeof UPDATE_BUDGET;
  id: string;
  payload: RecurringTransactionConfig;
}

interface RemoveBudgetAction {
  type: typeof REMOVE_BUDGET;
  id: string;
}

export const createBudget = (rT: RecurringTransactionConfig): CreateBudgetAction => ({
  type: CREATE_BUDGET,
  payload: rT,
});

export const updateBudget = (id: string, rT: RecurringTransactionConfig): UpdateBudgetAction => ({
  type: UPDATE_BUDGET,
  payload: rT,
  id,
});

export const removeBudget = (id: string): RemoveBudgetAction => ({
  type: REMOVE_BUDGET,
  id,
});

export type BudgetsActions = CreateBudgetAction | UpdateBudgetAction | RemoveBudgetAction;
