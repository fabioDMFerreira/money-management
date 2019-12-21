import { Balance } from 'models/Balance';
import Forecast from 'models/Forecast/Forecast';
import Transaction from 'models/Transaction';
import roundDecimal from 'utils/roundDecimal';

import { firstMonthDay, isDateInGroup, monthDiff, sumMonths } from '../../utils/dateUtils/dateUtils';
import calculateBalance from './calculateTransactionsBalance';

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
