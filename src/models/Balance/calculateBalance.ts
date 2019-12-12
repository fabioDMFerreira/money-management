import roundDecimal from 'utils/roundDecimal';

import Transaction from '../Transaction';
import { Balance } from './Balance';

export default (transactions: Transaction[]): Balance => transactions
  .reduce((balance: Balance, transaction: Transaction) => {
    const finalBalance = balance;

    if (transaction.value > 0) {
      finalBalance.income += transaction.value;
    } else {
      finalBalance.outcome -= transaction.value;
    }

    finalBalance.balance += transaction.value;

    finalBalance.balance = roundDecimal(finalBalance.balance);
    finalBalance.income = roundDecimal(finalBalance.income);
    finalBalance.outcome = roundDecimal(finalBalance.outcome);

    return finalBalance;
  }, { income: 0, outcome: 0, balance: 0 });
