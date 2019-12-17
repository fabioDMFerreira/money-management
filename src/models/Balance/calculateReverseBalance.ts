import roundDecimal from 'utils/roundDecimal';

import Forecast from '../Forecast/Forecast';
import Transaction from '../Transaction';
import { firstMonthDay, isDateInGroup, isDateIntervalInGroup, isMonthsIntervalInGroup, lastMonthDay, monthDiff, sumMonths } from '../utils';
import { Balance } from './Balance';
import calculateBalance from './calculateBalance';

export default (forecast: Forecast, transactions: Transaction[]): Balance[] => {
  const balances: Balance[] = [];

  const balanceMonths: number = monthDiff(forecast.startDate, forecast.endDate);

  let cumulativeValue: number = forecast.endValue;
  let valueToChangePreviousMonth = 0;
  for (let i = 0; i < balanceMonths; i++) {
    const balanceDate: Date = sumMonths(firstMonthDay(forecast.endDate), i * -1);
    const monthTransactions: Transaction[] =
      transactions.filter(transaction =>
        isDateInGroup(transaction.startDate, balanceDate));

    const balance = calculateBalance(monthTransactions);
    cumulativeValue -= valueToChangePreviousMonth;
    valueToChangePreviousMonth = balance.balance;
    balance.date = balanceDate;
    balance.actualValue = roundDecimal(cumulativeValue);

    balances.unshift(balance);
  }

  return balances;
};
