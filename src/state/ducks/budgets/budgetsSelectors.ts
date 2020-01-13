import { RecurringTransactionConfig } from './../../../models/RecurringTransaction/RecurringTransaction';

export const getBudgets = (state: any) =>
  state && state.budgets && state.budgets.budgets &&
state.budgets.budgets.toJS();

export const getBudgetById = (state: any, id: string): RecurringTransactionConfig | undefined =>
  state && state.budgets && state.budgets.budgets &&
  state.budgets.budgets.toJS().find((budget: RecurringTransactionConfig) => budget.id === id);
