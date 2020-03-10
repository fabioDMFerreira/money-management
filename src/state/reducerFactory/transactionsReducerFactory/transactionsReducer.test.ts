import YYYYMMDD from 'utils/dateUtils/YYYYMMDD';

import {
  addNewTransaction,
  bulkAddTransactions,
  clearTransactions,
  deleteTransaction,
  selectAllTransactions,
  selectTransaction,
  unselectAllTransactions,
  unselectTransaction,
  updateTransaction,
} from './transactionsActionsFactory';
import transactionsReducerFactory, { transactionsInitialState, TransactionsState } from './transactionsReducerFactory';
import { TRANSACTIONS } from './transactionsReducersKeys';

const transactionsReducer = transactionsReducerFactory(TRANSACTIONS);

describe('transactionsReducer', () => {
  describe('addNewTransaction', () => {
    it('should add a new transaction to transactions list and all transactions list', () => {
      const actual = transactionsReducer(transactionsInitialState, addNewTransaction(TRANSACTIONS)());

      expect(actual.transactions.length).toEqual(1);
      expect(actual.allTransactions.length).toEqual(1);

      const actual2 = transactionsReducer(actual, addNewTransaction(TRANSACTIONS)());

      expect(actual2.transactions.length).toEqual(2);
      expect(actual2.allTransactions.length).toEqual(2);
    });

    describe('should add a new transaction that respects global filters', () => {
      it('(start date)', () => {
        const state: TransactionsState = {
          ...transactionsInitialState,
        };

        const actual = transactionsReducer(state, addNewTransaction(TRANSACTIONS)());

        const createdTransaction = actual.transactions[0];

        expect(createdTransaction.startDate).toEqual(YYYYMMDD(new Date()));
      });

      it('(tags)', () => {
        const state: TransactionsState = {
          ...transactionsInitialState,
        };

        const actual = transactionsReducer(state, addNewTransaction(TRANSACTIONS)());

        const createdTransaction = actual.transactions[0];

        expect(createdTransaction.tags).toEqual([]);
      });
    });
  });

  describe('bulkAddTransactions', () => {
    describe('should add transactions that match global filters to transactions list and to all transactions list', () => {
      it('(start date)', () => {
        const state: TransactionsState = {
          ...transactionsInitialState,
        };

        const actual = transactionsReducer(state, bulkAddTransactions(TRANSACTIONS)([{
          description: 't1',
          startDate: '2018-04-21',
        }, {
          description: 't2',
          startDate: '2019-12-12',
        }]));

        expect(actual.transactions.length).toEqual(2);
        expect(actual.allTransactions.length).toEqual(2);
        expect(actual.transactions[0].description).toEqual('t2');
      });

      it('(end date)', () => {
        const state: TransactionsState = {
          ...transactionsInitialState,
        };

        const actual = transactionsReducer(state, bulkAddTransactions(TRANSACTIONS)([{
          description: 't1',
          startDate: '2018-04-21',
        }, {
          description: 't2',
          startDate: '2019-12-12',
        }]));

        expect(actual.transactions.length).toEqual(2);
        expect(actual.allTransactions.length).toEqual(2);
        expect(actual.transactions[0].description).toEqual('t2');
      });

      it('(tags)', () => {
        const state: TransactionsState = {
          ...transactionsInitialState,
        };

        const actual = transactionsReducer(state, bulkAddTransactions(TRANSACTIONS)([{
          description: 't1',
          startDate: '2019-12-15',
          tags: ['tag1', 'tag2'],
        }, {
          description: 't2',
          startDate: '2019-12-12',
          tags: ['tag1'],
        },
        {
          description: 't3',
          startDate: '2019-12-10',
          tags: ['tag3'],
        },
        ]));

        expect(actual.transactions.length).toEqual(3);
        expect(actual.allTransactions.length).toEqual(3);
        expect(actual.transactions[0].description).toEqual('t1');
        expect(actual.transactions[1].description).toEqual('t2');
      });
    });
  });

  describe('updateTransaction', () => {
    it('should update transaction in transactions list and in all transactions list', () => {
      const state: TransactionsState = {
        ...transactionsInitialState,
        transactions: [{
          id: '1',
          description: 't1',
          credit: '50',
        }],
        allTransactions: [{ id: '2', description: 't2' }, {
          id: '1',
          description: 't1',
          credit: '50',
        }],
      };

      const actual = transactionsReducer(state, updateTransaction(TRANSACTIONS)('1', 100, 'credit'));

      expect(actual.transactions[0].credit).toEqual('100');
      expect(actual.allTransactions[1].credit).toEqual('100');
    });

    it('should remove transaction from transactions if it does not matches global filters', () => {
      const state: TransactionsState = {
        ...transactionsInitialState,
        transactions: [{
          id: '1',
          description: 't1',
          startDate: '2019-04-10',
        }],
        allTransactions: [{
          id: '1',
          description: 't1',
          startDate: '2019-04-10',
        }],
      };

      const actual = transactionsReducer(state, updateTransaction(TRANSACTIONS)('1', '2017-01-01', 'startDate'));

      expect(actual.allTransactions[0].startDate).toEqual('2017-01-01');
      expect(actual.transactions.length).toEqual(1);
    });
  });

  describe('deleteTransaction', () => {
    it('should delete transactions from transactions list and all transactions list', () => {
      const state: TransactionsState = {
        ...transactionsInitialState,
        transactions: [{
          id: '1',
          description: 't1',
          startDate: '2019-04-10',
        }],
        allTransactions: [{
          id: '2',
          description: 't2',
        }, {
          id: '1',
          description: 't1',
          startDate: '2019-04-10',
        }],
      };

      const actual = transactionsReducer(state, deleteTransaction(TRANSACTIONS)('1'));

      expect(actual.transactions.length).toEqual(0);
      expect(actual.allTransactions.length).toEqual(1);
    });
  });

  describe('clearTransactions', () => {
    it('should delete all transactions from transactions list and all transactions list', () => {
      const state: TransactionsState = {
        ...transactionsInitialState,
        transactions: [{
          id: '1',
          description: 't1',
          startDate: '2019-04-10',
        }],
        allTransactions: [{
          id: '2',
          description: 't2',
        }, {
          id: '1',
          description: 't1',
          startDate: '2019-04-10',
        }],
      };

      const actual = transactionsReducer(state, clearTransactions(TRANSACTIONS)());

      expect(actual.transactions.length).toEqual(0);
      expect(actual.allTransactions.length).toEqual(0);
    });
  });

  describe('selectTransaction', () => {
    it('should select a transaction', () => {
      const state: TransactionsState = {
        ...transactionsInitialState,
      };

      const actual = transactionsReducer(state, selectTransaction(TRANSACTIONS)('test-1'));

      expect(actual.selected['test-1']).toEqual(true);
    });
  });

  describe('unselectTransaction', () => {
    it('should unselect a transaction', () => {
      const state: TransactionsState = {
        ...transactionsInitialState,
        selected: {
          'test-1': true,
        },
      };

      const actual = transactionsReducer(state, unselectTransaction(TRANSACTIONS)('test-1'));

      expect(actual.selected['test-1']).toEqual(false);
    });
  });


  describe('selectAllTransactions', () => {
    it('should select all transactions available', () => {
      const state: TransactionsState = {
        ...transactionsInitialState,
        transactions: [{
          id: '1',
          description: 't1',
          startDate: '2019-04-10',
        }, {
          id: '2',
          description: 't1',
          startDate: '2019-04-10',
        }, {
          id: '3',
          description: 't1',
          startDate: '2019-04-10',
        }],
      };

      const actual = transactionsReducer(state, selectAllTransactions(TRANSACTIONS)());

      expect(actual.selected).toEqual({
        1: true,
        2: true,
        3: true,
      });
    });
  });

  describe('unselectAllTransactions', () => {
    it('should reinitialize selected field', () => {
      const state: TransactionsState = {
        ...transactionsInitialState,
        transactions: [{
          id: '1',
          description: 't1',
          startDate: '2019-04-10',
        }, {
          id: '2',
          description: 't1',
          startDate: '2019-04-10',
        }, {
          id: '3',
          description: 't1',
          startDate: '2019-04-10',
        }],
        selected: {
          1: true,
          2: true,
          3: false,
        },
      };

      const actual = transactionsReducer(state, unselectAllTransactions(TRANSACTIONS)());

      expect(actual.selected).toEqual({});
    });
  });
});
