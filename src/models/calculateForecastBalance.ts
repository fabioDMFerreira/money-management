import roundDecimal from 'utils/roundDecimal';

import { Balance } from './Balance';
import calculateBalance from './Balance/calculateBalance';
import Forecast from './Forecast';
import Transaction from './Transaction';
import { isDateIntervalInGroup, isMonthsIntervalInGroup, monthDiff, sumMonths } from './utils';

export default (forecast: Forecast, transactions: Transaction[]): Balance[] => {
  const balances: Balance[] = [];

  const balanceMonths: number = monthDiff(forecast.startDate, forecast.endDate);

  let cumulativeValue: number = forecast.initialValue;

  for (let i = 0; i < balanceMonths; i++) {
    const balanceDate: Date = sumMonths(forecast.startDate, i);

    const monthTransactions: Transaction[] =
      transactions.filter((transaction) => {
        if (transaction.interval > 1) {
          return isMonthsIntervalInGroup(
            transaction.startDate,
            transaction.interval,
            transaction.particles,
            balanceDate,
          );
        }
        return isDateIntervalInGroup(transaction.startDate, transaction.endDate, balanceDate);
      });

    const balance = calculateBalance(monthTransactions);
    cumulativeValue += balance.balance;
    balance.date = balanceDate;
    balance.actualValue = roundDecimal(cumulativeValue);
    balances.push(balance);
  }

  return balances;
};
