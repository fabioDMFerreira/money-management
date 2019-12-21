import { Balance } from 'models/Balance';
import Forecast from 'models/Forecast';
import Transaction from 'models/Transaction';
import { TransactionConfig } from 'models/Transaction/TransactionConfig';
import { Wallet } from 'models/Wallet';
import { firstMonthDay, sumMonths } from 'utils/dateUtils/dateUtils';

import calculateReverseBalance from './calculateReverseBalance';
import calculateTransactionsBalancesByMonth from './calculateTransactionsBalancesByMonth';


export default (transactionsData: TransactionConfig[], wallets: Wallet[], initialDate?: Date, finalDate?: Date): Balance[] => {
  let minDate = initialDate;
  let maxDate = finalDate;

  const transactions: Transaction[] =
    transactionsData
      .map(transaction => Transaction.buildFromTransactionData(transaction));

  if (!minDate && !maxDate) {
    const startDates = transactions.map((transaction: Transaction) => transaction.startDate.getTime());
    const endDates =
      transactions.map((transaction: Transaction) => (transaction.endDate ? transaction.endDate.getTime() : transaction.startDate.getTime()));

    minDate = new Date(Math.min.apply(null, startDates));
    maxDate = new Date(Math.max.apply(null, endDates));
  }

  const today = new Date();
  const todayUtcDate = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()));
  const thisMonthFirstDay = firstMonthDay(todayUtcDate);


  const endValue = wallets.reduce((total, wallet: Wallet) => {
    total += wallet.balance;
    return total;
  }, 0);

  const forecastBeforeToday = minDate && new Forecast(minDate, thisMonthFirstDay, { endValue });
  const forecastAfterToday = maxDate && maxDate > sumMonths(thisMonthFirstDay, 1) &&
    new Forecast(sumMonths(thisMonthFirstDay, 1), maxDate, { initialValue: endValue });

  let balance: Balance[] = [];

  if (forecastBeforeToday) {
    balance = balance.concat(calculateReverseBalance(forecastBeforeToday, transactions));
  }

  if (forecastAfterToday) {
    balance = balance.concat(calculateTransactionsBalancesByMonth(transactions, forecastAfterToday.startDate, forecastAfterToday.endDate));
  }

  return balance;
};
