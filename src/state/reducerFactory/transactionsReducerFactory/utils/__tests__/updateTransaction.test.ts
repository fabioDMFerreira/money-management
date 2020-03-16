import { TransactionConfig } from 'models/Transaction/TransactionConfig';
import YYYYMMDD from 'utils/dateUtils/YYYYMMDD';

import updateTransaction from '../updateTransaction';


describe('updateTransaction', () => {
  it('should update directly visible, description, tags, selected and wallets', () => {
    let transaction: TransactionConfig = { description: 'test1' };

    transaction = updateTransaction('visible', true)(transaction);
    expect(transaction).toEqual({
      description: 'test1',
      visible: true,
    });

    transaction = updateTransaction('description', 'transaction 1')(transaction);
    expect(transaction).toEqual({
      description: 'transaction 1',
      visible: true,
    });
  });

  it('should update debit field', () => {
    let transaction: TransactionConfig = { description: 'test1' };

    transaction = updateTransaction('debit', '1000')(transaction);

    expect(transaction.debit).toEqual('1000');
  });

  it('should update credit field if debit value is negative', () => {
    let transaction: TransactionConfig = { description: 'test1' };

    transaction = updateTransaction('debit', '-1000')(transaction);

    expect(transaction.credit).toEqual('1000');
    expect(transaction.debit).toEqual('0');
  });

  it('should update end date field', () => {
    let transaction: TransactionConfig = { description: 'test1' };

    transaction = updateTransaction('endDate', '2020-01-02')(transaction);

    expect(transaction.endDate).toEqual('2020-01-02');
  });

  it('should update start date and end date fields with today date if no value is passed', () => {
    let transaction1: TransactionConfig = { description: 'test1' };
    let transaction2: TransactionConfig = { description: 'test2' };

    transaction1 = updateTransaction('startDate', '')(transaction1);
    transaction2 = updateTransaction('endDate', '')(transaction2);

    expect(transaction1.startDate).toEqual(YYYYMMDD(new Date()));
    expect(transaction2.endDate).toEqual(YYYYMMDD(new Date()));
  });
});
