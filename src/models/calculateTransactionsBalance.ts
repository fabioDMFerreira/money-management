import { Balance } from 'models/Balance';
import calculateReverseBalance from 'models/Balance/calculateReverseBalance';
import calculateForecastBalance from 'models/calculateForecastBalance';
import Forecast from 'models/Forecast';
import Transaction from 'models/Transaction';
import { TransactionConfig } from 'models/Transaction/TransactionConfig';
import { firstMonthDay, sumMonths } from 'models/utils';
import { Wallet } from 'models/Wallet';


export default (transactionsData: TransactionConfig[], initialDate?: Date, finalDate?: Date): Balance[] => {
  let minDate = initialDate;
  let maxDate = finalDate;

  const transactions: Transaction[] =
    transactionsData
      .map(transaction => Transaction.buildFromTransactionData(transaction));

  if (!minDate && !maxDate) {
    const startDates = transactions.map((transaction: Transaction) => transaction.startDate.getTime());
    const endDates =
      transactions.map((transaction: Transaction) => (
        transaction.endDate ?
          transaction.endDate.getTime() :
          transaction.startDate.getTime()
      ));

    minDate = new Date(Math.min.apply(null, startDates));
    maxDate = new Date(Math.max.apply(null, endDates));
  }

  if (!minDate || !maxDate) {
    return [];
  }
  const forecast = maxDate && new Forecast(minDate, maxDate, { initialValue: 0 });

  return calculateForecastBalance(forecast, transactions);
};
