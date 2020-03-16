import { TransactionConfig } from 'models/Transaction/TransactionConfig';

import checkTransactionDuplicatedFactory from '../isTransactionDuplicatedFactory';

describe('checkTransactionDuplicatedFactory', () => {
  it('should return true if there is a transaction in list with same total value and start date', () => {
    const transactions: TransactionConfig[] = [
      { description: '1', totalValue: '1000', startDate: '2020-01-02' },
      { description: '1', totalValue: '2000', startDate: '2020-01-03' },
      { description: '1', totalValue: '3000', startDate: '2020-01-05' },
    ];

    expect(checkTransactionDuplicatedFactory(transactions)({ description: '1', totalValue: '1000', startDate: '2020-01-02' })).toEqual(true);
    expect(checkTransactionDuplicatedFactory(transactions)({ description: '1', totalValue: '1002', startDate: '2020-01-02' })).toEqual(false);
  });
});
