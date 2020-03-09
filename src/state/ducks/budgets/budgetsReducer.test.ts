import { RecurringTransactionConfig } from 'models/RecurringTransaction';
import getRandomString from 'utils/getRandomString';

import { createBudget, removeBudget, updateBudget } from './budgetsActions';
import budgetsReducer, { BudgetsState } from './budgetsReducer';

describe('ContractsReducer', () => {
  it('addContract should add recurring transaction to budgets field', () => {
    const recurringTransaction: RecurringTransactionConfig = {
      id: getRandomString(),
      description: 'water bill',
      startDate: new Date(2018, 1, 15),
      times: 6,
      valuePerTime: 10,
      totalValue: 60,
      interval: 1,
      tags: [],
      wallet: '',
      type: 'budget',
      useEndDate: false,
      useTotalValue: false,
    };
    const state: BudgetsState = {
      budgets: [],
    };

    const actual = budgetsReducer(state, createBudget(recurringTransaction));
    const expected: BudgetsState = {
      budgets: [recurringTransaction],
    };

    expect(actual).toEqual(expected);
  });

  it('updateBudget should update recurring transaction in budgets field', () => {
    const id = getRandomString();
    const recurringTransaction: RecurringTransactionConfig = {
      id,
      description: 'water bill',
      startDate: new Date(2018, 1, 15),
      times: 6,
      valuePerTime: 10,
      totalValue: 60,
      interval: 1,
      tags: [],
      wallet: '',
      type: 'budget',
      useEndDate: false,
      useTotalValue: false,
    };
    const state: BudgetsState = {
      budgets: [recurringTransaction],
    };
    const update: RecurringTransactionConfig = {
      description: 'water bill',
      startDate: new Date(2018, 1, 15),
      times: 10,
      valuePerTime: 10,
      totalValue: 100,
      interval: 1,
      tags: [],
      wallet: '',
      type: 'budget',
      useEndDate: false,
      useTotalValue: false,
    };

    const actual = budgetsReducer(state, updateBudget(id, update));
    const expected: BudgetsState = {
      budgets: [{
        id: recurringTransaction.id,
        description: 'water bill',
        startDate: new Date(2018, 1, 15),
        times: 10,
        valuePerTime: 10,
        totalValue: 100,
        interval: 1,
        tags: [],
        wallet: '',
        type: 'budget',
        useEndDate: false,
        useTotalValue: false,
      }],
    };

    expect(actual).toEqual(expected);
  });


  it('removeBudget should remove recurring transaction in budgets field', () => {
    const id = getRandomString();
    const recurringTransaction: RecurringTransactionConfig = {
      id,
      description: 'water bill',
      startDate: new Date(2018, 1, 15),
      times: 6,
      valuePerTime: 10,
      totalValue: 60,
      interval: 1,
      tags: [],
      wallet: '',
      type: 'budget',
      useEndDate: false,
      useTotalValue: false,
    };
    const state: BudgetsState = {
      budgets: [recurringTransaction],
    };

    const actual = budgetsReducer(state, removeBudget(id));
    const expected: BudgetsState = {
      budgets: [],
    };

    expect(actual).toEqual(expected);
  });
});
