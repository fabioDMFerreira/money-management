import { Balance } from 'models/Balance';
import calculateForecastBalance from 'models/Balance/calculateForecastBalance';
import Forecast from 'models/Forecast';
import Transaction from 'models/Transaction';
import { TransactionConfig } from 'models/Transaction/TransactionConfig';
import { connect } from 'react-redux';

import passesFilters from './passesFilters';
import Timeline from './Timeline';

const calculateBalance = (transactionsData: TransactionConfig[], estimatesData: TransactionConfig[]): Balance[] => {
  const transactions: Transaction[] =
    transactionsData
      .map(transaction => Transaction.buildFromTransactionData(transaction));
  const estimates: Transaction[] =
    estimatesData
      .map(transaction => Transaction.buildFromTransactionData(transaction));

  const startDates = transactions.map((transaction: Transaction) => transaction.startDate.getTime());
  const endDates =
    transactions.map((transaction: Transaction) => (transaction.endDate ? transaction.endDate.getTime() : transaction.startDate.getTime()));

  const minDate = new Date(Math.min.apply(null, startDates));
  const maxDate = new Date(Math.max.apply(null, endDates));

  const forecast: Forecast = new Forecast(minDate, maxDate, { initialValue: 0 });
  const balance: Balance[] = calculateForecastBalance(forecast, transactions);

  // const forecastStartValue = balance && balance.length ? "" + balance[0].actualValue : "0";

  // const estimateForecast: Forecast = new Forecast(minDate, maxDate, { initialValue: +forecastStartValue });
  // const estimatesBalance = calculateForecastBalance(estimateForecast, estimates);

  // balance.forEach((monthBalance: Balance) => {
  //   const estimate = estimatesBalance.find((month: Balance) => monthBalance.date && month.date && YYYYMMDD(month.date) === YYYYMMDD(monthBalance.date) ? true : false);

  //   if (estimate) {
  //     monthBalance.estimateValue = monthBalance.actualValue && estimate.actualValue ? monthBalance.actualValue + (estimate.actualValue - +forecastStartValue) : estimate.actualValue;
  //   }
  // });

  return balance;
};

export default connect((state: any) => {
  const { financialForecast, wallets: { wallets } } = state;

  const transactions = financialForecast.transactions ?
    financialForecast
      .transactions.toJS()
      .filter((transaction: TransactionConfig) => transaction.visible)
      .filter(passesFilters(financialForecast.filters)) :
    [];

  const estimatesTransactions = financialForecast.estimatesTransactions ?
    financialForecast
      .estimatesTransactions.toJS()
      .filter((transaction: TransactionConfig) => transaction.visible)
      .filter(passesFilters(financialForecast.filters)) :
    [];

  return {
    estimatesTransactions,
    transactions,
    wallets: wallets ? wallets.toJS() : [],
    balance: calculateBalance(transactions, estimatesTransactions),
  };
})(Timeline);