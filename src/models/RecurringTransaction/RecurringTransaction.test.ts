import { TransactionConfig } from 'models/Transaction/TransactionConfig';

import { RecurringTransaction, RecurringTransactionConfig } from './RecurringTransaction';

describe('RecurringTransaction', () => {
  describe('constructor', () => {
    it('should generate automatically times and valuePerTime fields', () => {
      const data: RecurringTransactionConfig = {
        description: 'bill',
        startDate: new Date(2020, 1, 1),
        endDate: new Date(2020, 2, 2),
        totalValue: 5000,
        type: 'contract',
      };
      const rt = new RecurringTransaction(data);

      expect(rt.data.times).toEqual(2);
      expect(rt.data.valuePerTime).toEqual(2500);
    });

    it('should generate automatically endDate and totalValue fields', () => {
      const data: RecurringTransactionConfig = {
        description: 'bill',
        startDate: new Date(2020, 1, 1),
        useEndDate: false,
        times: 10,
        valuePerTime: 1000,
        type: 'contract',
      };
      const rt = new RecurringTransaction(data);

      expect(rt.data.totalValue).toEqual(10000);
      expect(rt.data.endDate).toEqual(new Date(2020, 10, 1));
    });
  });

  describe('isValid', () => {
    it('should validate recurring transaction met conditions to generate transactions', () => {
      const rt1 = new RecurringTransaction({
        description: 'bill',
        startDate: new Date(2020, 1, 1),
        useEndDate: false,
        times: 10,
        valuePerTime: 1000,
        type: 'contract',
      });

      expect(rt1.isValid()).toEqual(true);

      const rt2 = new RecurringTransaction({
        description: 'bill',
        startDate: new Date(2020, 1, 1),
        endDate: new Date(2020, 2, 2),
        totalValue: 5000,
        type: 'contract',
      });

      expect(rt2.isValid()).toEqual(true);

      rt2.data.description = '';
      expect(rt2.isValid()).toEqual(false);
      rt2.data.description = 'bill';
      expect(rt2.isValid()).toEqual(true);

      rt2.data.useTotalValue = true;
      rt2.data.totalValue = 0;
      expect(rt2.isValid()).toEqual(false);
      rt2.data.totalValue = 1000;
      expect(rt2.isValid()).toEqual(true);
      rt2.data.useTotalValue = false;
      rt2.data.valuePerTime = 0;
      expect(rt2.isValid()).toEqual(false);
      rt2.data.valuePerTime = 1000;
      expect(rt2.isValid()).toEqual(true);

      rt2.data.useEndDate = true;
      rt2.data.endDate = undefined;
      expect(rt2.isValid()).toEqual(false);
      rt2.data.endDate = new Date();
      expect(rt2.isValid()).toEqual(true);
      rt2.data.useEndDate = false;
      rt2.data.times = 0;
      expect(rt2.isValid()).toEqual(false);
      rt2.data.times = 10;
      expect(rt2.isValid()).toEqual(true);
    });
  });

  describe('generateTransactions', () => {
    it('should generate transactions with recurring transactions details', () => {
      const rt = new RecurringTransaction({
        description: 'bill',
        startDate: new Date(2020, 1, 1),
        endDate: new Date(2020, 2, 2),
        useEndDate: true,
        useTotalValue: true,
        totalValue: -5000,
        type: 'contract',
      });

      const actual = rt.generateTransactions();


      expect(actual.length).toEqual(2);
      expect(actual[0].debit).toEqual('2500');
      expect(actual[1].debit).toEqual('2500');
      expect(actual[0].startDate).toEqual('2020-02-01');
      expect(actual[1].startDate).toEqual('2020-03-01');
      expect(actual[0].description).toEqual('bill');
    });
  });
});
