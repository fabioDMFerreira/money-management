import FinancialForecastReducer, { State, initialState } from "./reducers";
import {
  addNewTransaction,
  bulkAddTransactions,
  updateTransaction,
  deleteTransaction,
  clearTransactions,
  updateGlobalFilter
} from "./actions";
import { List } from "immutable";
import TransactionDataInterface from "../../../models/ITransactionData";

describe(`FinancialForecastReducer`, () => {

  describe(`addNewTransaction`, () => {

    it('should add a new transaction to transactions list and all transactions list', () => {
      const actual = FinancialForecastReducer(undefined, addNewTransaction('TRANSACTIONS')());

      expect(actual.transactions.size).toEqual(1);
      expect(actual.allTransactions.size).toEqual(1);

      const actual2 = FinancialForecastReducer(actual, addNewTransaction('TRANSACTIONS')());

      expect(actual2.transactions.size).toEqual(2);
      expect(actual2.allTransactions.size).toEqual(2);
    })

    describe('should add a new transaction that respects global filters', () => {

      it('(start date)', () => {
        const state: State = {
          ...initialState,
          globalFilters: {
            startDate: '2019-06-02'
          }
        };

        const actual = FinancialForecastReducer(state, addNewTransaction('TRANSACTIONS')());

        const createdTransaction = actual.transactions.get(0);

        expect(createdTransaction.startDate).toEqual('2019-06-02');
      });

      it('(end date)', () => {
        const state: State = {
          ...initialState,
          globalFilters: {
            endDate: '2019-06-02'
          }
        };

        const actual = FinancialForecastReducer(state, addNewTransaction('TRANSACTIONS')());

        const createdTransaction = actual.transactions.get(0);

        expect(createdTransaction.startDate).toEqual('2019-06-02');
      })

      it('(tags)', () => {
        const state: State = {
          ...initialState,
          globalFilters: {
            tags: [{
              label: 'label1',
              value: 'label1'
            }, {
              label: 'label2',
              value: 'label2'
            }]
          }
        };

        const actual = FinancialForecastReducer(state, addNewTransaction('TRANSACTIONS')());

        const createdTransaction = actual.transactions.get(0);

        expect(createdTransaction.tags).toEqual([{
          label: 'label1',
          value: 'label1'
        }, {
          label: 'label2',
          value: 'label2'
        }]);
      })
    })
  });

  describe('bulkAddTransactions', () => {

    describe('should add transactions that match global filters to transactions list and to all transactions list', () => {

      it('(start date)', () => {
        const state: State = {
          ...initialState,
          globalFilters: {
            startDate: '2019-05-21'
          }
        }

        const actual = FinancialForecastReducer(state, bulkAddTransactions("TRANSACTIONS")([{
          description: 't1',
          startDate: '2018-04-21'
        }, {
          description: 't2',
          startDate: '2019-12-12'
        }]));

        expect(actual.transactions.size).toEqual(1);
        expect(actual.allTransactions.size).toEqual(2);
        expect(actual.transactions.get(0).description).toEqual('t2');
      })

      it('(end date)', () => {
        const state: State = {
          ...initialState,
          globalFilters: {
            endDate: '2019-05-21'
          }
        }

        const actual = FinancialForecastReducer(state, bulkAddTransactions("TRANSACTIONS")([{
          description: 't1',
          startDate: '2018-04-21'
        }, {
          description: 't2',
          startDate: '2019-12-12'
        }]));

        expect(actual.transactions.size).toEqual(1);
        expect(actual.allTransactions.size).toEqual(2);
        expect(actual.transactions.get(0).description).toEqual('t1');
      })

      it('(tags)', () => {
        const state: State = {
          ...initialState,
          globalFilters: {
            tags: [{
              label: 'tag1',
              value: 'tag1'
            }, {
              label: 'tag2',
              value: 'tag2'
            }]
          }
        }

        const actual = FinancialForecastReducer(state, bulkAddTransactions("TRANSACTIONS")([{
          description: 't1',
          startDate: '2018-04-21',
          tags: [{
            label: 'tag1',
            value: 'tag1'
          }, {
            label: 'tag2',
            value: 'tag2'
          }]
        }, {
          description: 't2',
          startDate: '2019-12-12',
          tags: [{
            label: 'tag1',
            value: 'tag1'
          }],
        },
        {
          description: 't3',
          startDate: '2019-12-12',
          tags: [{
            label: 'tag3',
            value: 'tag3'
          }]
        }
        ]));

        expect(actual.transactions.size).toEqual(2);
        expect(actual.allTransactions.size).toEqual(3);
        expect(actual.transactions.get(0).description).toEqual('t1');
        expect(actual.transactions.get(1).description).toEqual('t2');
      })

    })

  })

  describe('updateTransaction', () => {

    it('should update transaction in transactions list and in all transactions list', () => {
      const state: State = {
        ...initialState,
        transactions: List<TransactionDataInterface>([{
          id: '1',
          description: 't1',
          credit: 50
        }]),
        allTransactions: List<TransactionDataInterface>([{ id: '2', description: 't2' }, {
          id: '1',
          description: 't1',
          credit: 50
        }]),
      }

      const actual = FinancialForecastReducer(state, updateTransaction("TRANSACTIONS")('1', 100, "credit"));

      expect(actual.transactions.get(0).credit).toEqual("100");
      expect(actual.allTransactions.get(1).credit).toEqual("100");
    });

    it('should remove transaction from transactions if it does not matches global filters', () => {
      const state: State = {
        ...initialState,
        globalFilters: {
          startDate: '2019-04-01'
        },
        transactions: List<TransactionDataInterface>([{
          id: '1',
          description: 't1',
          startDate: '2019-04-10'
        }]),
        allTransactions: List<TransactionDataInterface>([{
          id: '1',
          description: 't1',
          startDate: '2019-04-10'
        }]),
      }

      const actual = FinancialForecastReducer(state, updateTransaction("TRANSACTIONS")('1', '2017-01-01', "startDate"));

      expect(actual.allTransactions.get(0).startDate).toEqual('2017-01-01');
      expect(actual.transactions.size).toEqual(0);
    });

  });

  describe('deleteTransaction', () => {
    it('should delete transactions from transactions list and all transactions list', () => {
      const state: State = {
        ...initialState,
        transactions: List<TransactionDataInterface>([{
          id: '1',
          description: 't1',
          startDate: '2019-04-10'
        }]),
        allTransactions: List<TransactionDataInterface>([{
          id: '2',
          description: 't2',
        }, {
          id: '1',
          description: 't1',
          startDate: '2019-04-10'
        }]),
      };

      const actual = FinancialForecastReducer(state, deleteTransaction("TRANSACTIONS")('1'));

      expect(actual.transactions.size).toEqual(0);
      expect(actual.allTransactions.size).toEqual(1);

    });
  });

  describe('clearTransactions', () => {
    it('should delete all transactions from transactions list and all transactions list', () => {
      const state: State = {
        ...initialState,
        transactions: List<TransactionDataInterface>([{
          id: '1',
          description: 't1',
          startDate: '2019-04-10'
        }]),
        allTransactions: List<TransactionDataInterface>([{
          id: '2',
          description: 't2',
        }, {
          id: '1',
          description: 't1',
          startDate: '2019-04-10'
        }]),
      };

      const actual = FinancialForecastReducer(state, clearTransactions("TRANSACTIONS")());

      expect(actual.transactions.size).toEqual(0);
      expect(actual.allTransactions.size).toEqual(0);

    });
  });

  describe('updateGlobalFilter', () => {
    it('should update global filter and filter transactions', () => {
      const state: State = {
        ...initialState,
        transactions: List<TransactionDataInterface>([{
          id: '2',
          description: 't2',
          startDate: '2020-04-03'
        }, {
          id: '1',
          description: 't1',
          startDate: '2019-04-10'
        }]),
        allTransactions: List<TransactionDataInterface>([{
          id: '2',
          description: 't2',
          startDate: '2020-04-03'
        }, {
          id: '1',
          description: 't1',
          startDate: '2019-04-10'
        }]),
      };

      const actual = FinancialForecastReducer(state, updateGlobalFilter('startDate', '2019-06-01'));

      expect(actual.transactions.size).toEqual(1);
      expect(actual.allTransactions.size).toEqual(2);

      expect(actual.transactions.get(0).description).toEqual('t2');

    });
  })



});