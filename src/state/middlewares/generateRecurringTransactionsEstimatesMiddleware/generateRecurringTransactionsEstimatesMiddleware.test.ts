import { List } from 'immutable';
import { RecurringTransaction, RecurringTransactionConfig } from 'models/RecurringTransaction';

import { createBudget, removeBudget, updateBudget } from './../../ducks/budgets/budgetsActions';
import { createContract, removeContract, updateContract } from './../../ducks/contracts/contractsActions';
import { BULK_ADD_TRANSACTIONS } from './../../ducks/financial-forecast/types';
import generateRecurringTransactionsEstimatesMiddleware from './generateRecurringTransactionsEstimatesMiddleware';

const store = {
  getState: () => ({}),
};

describe('generateRecurringTransactionsEstimatesMiddleware', () => {
  it('creating contract should create estimates with contract details', () => {
    const dispatch = jest.fn();
    const contract: RecurringTransactionConfig = {
      description: 'water bill',
      startDate: new Date(2018, 1, 15),
      times: 6,
      valuePerTime: 10,
      totalValue: 60,
      interval: 1,
      tags: [],
      wallet: '',
      type: 'contract',
      useEndDate: false,
      useTotalValue: false,
    };
    const createContractAction = createContract(contract);

    generateRecurringTransactionsEstimatesMiddleware(store)(dispatch)(createContractAction);

    expect(dispatch).toHaveBeenCalledTimes(2);

    const recurringTransaction = new RecurringTransaction(contract);
    const rtTransactions = recurringTransaction.generateTransactions();

    // expect to bulk create estimates
    expect(dispatch.mock.calls[0][0].type).toEqual(BULK_ADD_TRANSACTIONS);
    expect(dispatch.mock.calls[0][0].transactions.length).toEqual(rtTransactions.length);
    expect(dispatch.mock.calls[0][0].key).toEqual('ESTIMATES');

    expect(createContractAction.payload.transactionsIds).toBeTruthy();
    if (createContractAction.payload.transactionsIds) {
      expect(createContractAction.payload.transactionsIds.length).toEqual(rtTransactions.length);
    }

    expect(dispatch.mock.calls[1][0]).toEqual(createContractAction);
  });

  it('creating budget should create estimates with budget details', () => {
    const dispatch = jest.fn();
    const budget: RecurringTransactionConfig = {
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
    const createBudgetAction = createBudget(budget);

    generateRecurringTransactionsEstimatesMiddleware(store)(dispatch)(createBudgetAction);

    expect(dispatch).toHaveBeenCalledTimes(2);

    const recurringTransaction = new RecurringTransaction(budget);
    const rtTransactions = recurringTransaction.generateTransactions();

    // expect to bulk create estimates
    expect(dispatch.mock.calls[0][0].type).toEqual(BULK_ADD_TRANSACTIONS);
    expect(dispatch.mock.calls[0][0].transactions.length).toEqual(rtTransactions.length);
    expect(dispatch.mock.calls[0][0].key).toEqual('ESTIMATES');

    expect(createBudgetAction.payload.transactionsIds).toBeTruthy();
    if (createBudgetAction.payload.transactionsIds) {
      expect(createBudgetAction.payload.transactionsIds.length).toEqual(rtTransactions.length);
    }
    expect(dispatch.mock.calls[1][0]).toEqual(createBudgetAction);
  });

  it('updating contract that does not exist in store should not call dispatch', () => {
    const dispatch = jest.fn();
    const contract: RecurringTransactionConfig = {
      description: 'water bill',
      startDate: new Date(2018, 1, 15),
      times: 6,
      valuePerTime: 10,
      totalValue: 60,
      interval: 1,
      tags: [],
      wallet: '',
      type: 'contract',
      useEndDate: false,
      useTotalValue: false,
    };
    const updateContractAction = updateContract('1', contract);

    generateRecurringTransactionsEstimatesMiddleware(store)(dispatch)(updateContractAction);

    expect(dispatch).toBeCalledTimes(0);
  });

  it('updating contract should remove associated estimates and create new estimates with contract details', () => {
    const dispatch = jest.fn();
    const contract: RecurringTransactionConfig = {
      description: 'water bill',
      startDate: new Date(2018, 1, 15),
      times: 6,
      valuePerTime: 10,
      totalValue: 60,
      interval: 1,
      tags: [],
      wallet: '',
      type: 'contract',
      useEndDate: false,
      useTotalValue: false,
    };
    const updateContractAction = updateContract('1', contract);

    const store = {
      getState: () => ({
        contracts: {
          contracts: List<RecurringTransactionConfig>([{
            id: '1',
            description: 'water bill',
            startDate: new Date(2018, 1, 15),
            times: 6,
            valuePerTime: 10,
            totalValue: 60,
            interval: 1,
            tags: [],
            wallet: '',
            type: 'contract',
            useEndDate: false,
            useTotalValue: false,
            transactionsIds: ['1', '2', '3'],
          }]),
        },
      }),
    };

    generateRecurringTransactionsEstimatesMiddleware(store)(dispatch)(updateContractAction);

    expect(dispatch).toHaveBeenCalledTimes(3);

    const recurringTransaction = new RecurringTransaction(contract);
    const rtTransactions = recurringTransaction.generateTransactions();

    // remove existing associated transactions
    expect(dispatch.mock.calls[0][0].ids).toEqual(['1', '2', '3']);

    // expect to bulk create estimates
    expect(dispatch.mock.calls[1][0].type).toEqual(BULK_ADD_TRANSACTIONS);
    expect(dispatch.mock.calls[1][0].transactions.length).toEqual(rtTransactions.length);
    expect(dispatch.mock.calls[1][0].key).toEqual('ESTIMATES');

    expect(updateContractAction.payload.transactionsIds).toBeTruthy();
    if (updateContractAction.payload.transactionsIds) {
      expect(updateContractAction.payload.transactionsIds.length).toEqual(rtTransactions.length);
    }
    expect(dispatch.mock.calls[2][0]).toEqual(updateContractAction);
  });

  it('updating budget that does not exist in store should not call dispatch', () => {
    const dispatch = jest.fn();
    const budget: RecurringTransactionConfig = {
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
    const updateBudgetAction = updateBudget('1', budget);

    generateRecurringTransactionsEstimatesMiddleware(store)(dispatch)(updateBudgetAction);

    expect(dispatch).toBeCalledTimes(0);
  });

  it('updating budget should remove associated estimates and create new estimates with budget details', () => {
    const dispatch = jest.fn();
    const budget: RecurringTransactionConfig = {
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
    const updateContractAction = updateBudget('1', budget);

    const store = {
      getState: () => ({
        budgets: {
          budgets: List<RecurringTransactionConfig>([{
            id: '1',
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
            transactionsIds: ['1', '2', '3'],
          }]),
        },
      }),
    };

    generateRecurringTransactionsEstimatesMiddleware(store)(dispatch)(updateContractAction);

    expect(dispatch).toHaveBeenCalledTimes(3);

    const recurringTransaction = new RecurringTransaction(budget);
    const rtTransactions = recurringTransaction.generateTransactions();

    // remove existing associated transactions
    expect(dispatch.mock.calls[0][0].ids).toEqual(['1', '2', '3']);

    // expect to bulk create estimates
    expect(dispatch.mock.calls[1][0].type).toEqual(BULK_ADD_TRANSACTIONS);
    expect(dispatch.mock.calls[1][0].transactions.length).toEqual(rtTransactions.length);
    expect(dispatch.mock.calls[1][0].key).toEqual('ESTIMATES');

    expect(updateContractAction.payload.transactionsIds).toBeTruthy();
    if (updateContractAction.payload.transactionsIds) {
      expect(updateContractAction.payload.transactionsIds.length).toEqual(rtTransactions.length);
    }
    expect(dispatch.mock.calls[2][0]).toEqual(updateContractAction);
  });

  it('removing contract that does no exist should call dispatch 0 times', () => {
    const dispatch = jest.fn();
    const removeContractAction = removeContract('1');

    generateRecurringTransactionsEstimatesMiddleware(store)(dispatch)(removeContractAction);

    expect(dispatch).toHaveBeenCalledTimes(0);
  });

  it('removing contract should remove associated estimates', () => {
    const dispatch = jest.fn();
    const removeContractAction = removeContract('1');

    const store = {
      getState: () => ({
        contracts: {
          contracts: List<RecurringTransactionConfig>([{
            id: '1',
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
            transactionsIds: ['1', '2', '3'],
          }]),
        },
      }),
    };

    generateRecurringTransactionsEstimatesMiddleware(store)(dispatch)(removeContractAction);

    expect(dispatch).toHaveBeenCalledTimes(2);

    // remove existing associated transactions
    expect(dispatch.mock.calls[0][0].ids).toEqual(['1', '2', '3']);

    expect(dispatch.mock.calls[1][0]).toEqual(removeContractAction);
  });

  it('removing budget that does no exist should call dispatch 0 times', () => {
    const dispatch = jest.fn();
    const removeBudgetAction = removeBudget('1');

    generateRecurringTransactionsEstimatesMiddleware(store)(dispatch)(removeBudgetAction);

    expect(dispatch).toHaveBeenCalledTimes(0);
  });

  it('removing budget should remove associated estimates', () => {
    const dispatch = jest.fn();
    const removeContractAction = removeBudget('1');

    const store = {
      getState: () => ({
        budgets: {
          budgets: List<RecurringTransactionConfig>([{
            id: '1',
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
            transactionsIds: ['1', '2', '3'],
          }]),
        },
      }),
    };

    generateRecurringTransactionsEstimatesMiddleware(store)(dispatch)(removeContractAction);

    expect(dispatch).toHaveBeenCalledTimes(2);

    // remove existing associated transactions
    expect(dispatch.mock.calls[0][0].ids).toEqual(['1', '2', '3']);

    expect(dispatch.mock.calls[1][0]).toEqual(removeContractAction);
  });
});
