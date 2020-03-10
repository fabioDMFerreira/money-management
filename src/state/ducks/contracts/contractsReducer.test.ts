import { RecurringTransactionConfig } from 'models/RecurringTransaction';
import getRandomString from 'utils/getRandomString';

import { createContract, removeContract, updateContract } from './contractsActions';
import contractsReducer, { ContractsState } from './contractsReducer';

describe('ContractsReducer', () => {
  it('addContract should add recurring transaction to contracts field', () => {
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
      type: 'contract',
      useEndDate: false,
      useTotalValue: false,
    };
    const state: ContractsState = {
      contracts: [],
    };

    const actual = contractsReducer(state, createContract(recurringTransaction));
    const expected: ContractsState = {
      contracts: [recurringTransaction],
    };

    expect(actual).toEqual(expected);
  });

  it('updateContract should update recurring transaction in contracts field', () => {
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
      type: 'contract',
      useEndDate: false,
      useTotalValue: false,
    };
    const state: ContractsState = {
      contracts: [recurringTransaction],
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
      type: 'contract',
      useEndDate: false,
      useTotalValue: false,
    };

    const actual = contractsReducer(state, updateContract(id, update));
    const expected: ContractsState = {
      contracts: [{
        id: recurringTransaction.id,
        description: 'water bill',
        startDate: new Date(2018, 1, 15),
        times: 10,
        valuePerTime: 10,
        totalValue: 100,
        interval: 1,
        tags: [],
        wallet: '',
        type: 'contract',
        useEndDate: false,
        useTotalValue: false,
      }],
    };

    expect(actual).toEqual(expected);
  });

  it('updateContract should not update recurring transaction in contracts field if there is no contract with id', () => {
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
      type: 'contract',
      useEndDate: false,
      useTotalValue: false,
    };
    const state: ContractsState = {
      contracts: [recurringTransaction],
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
      type: 'contract',
      useEndDate: false,
      useTotalValue: false,
    };

    const actual = contractsReducer(state, updateContract('20', update));


    expect(actual).toEqual(state);
  });


  it('removeContract should remove recurring transaction in contracts field', () => {
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
      type: 'contract',
      useEndDate: false,
      useTotalValue: false,
    };
    const state: ContractsState = {
      contracts: [recurringTransaction],
    };

    const actual = contractsReducer(state, removeContract(id));
    const expected: ContractsState = {
      contracts: [],
    };

    expect(actual).toEqual(expected);
  });

  it('removeContract should not remove recurring transaction in contracts field if there is no contract with id', () => {
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
      type: 'contract',
      useEndDate: false,
      useTotalValue: false,
    };
    const state: ContractsState = {
      contracts: [recurringTransaction],
    };

    const actual = contractsReducer(state, removeContract('20'));


    expect(actual).toEqual(state);
  });
});
