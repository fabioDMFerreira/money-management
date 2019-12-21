import { Balance } from 'models/Balance';
import Forecast from 'models/Forecast';
import Transaction from 'models/Transaction';

import calculateForecastBalance from './calculateForecastBalance';


export default (transactions: Transaction[], initialDate?: Date, finalDate?: Date): Balance[] => {
  let minDate = initialDate;
  let maxDate = finalDate;

  const startDates = transactions.map((transaction: Transaction) => transaction.startDate.getTime());

  if (!minDate) {
    minDate = new Date(Math.min.apply(null, startDates));
  }

  if (!maxDate) {
    maxDate = new Date(Math.max.apply(null, startDates));
  }

  if (!minDate || !maxDate) {
    return [];
  }

  const forecast = maxDate && new Forecast(minDate, maxDate, { initialValue: 0 });

  return calculateForecastBalance(forecast, transactions);
};
