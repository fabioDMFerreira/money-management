import Transaction from 'models/Transaction';
import TransactionConfig from 'models/Transaction/TransactionConfig';
import { connect } from 'react-redux';
import calculateForecastBalance from 'models/Balance/calculateForecastBalance';


import Timeline from './Timeline';
import passesFilters from './passesFilters';
import Forecast from 'models/Forecast';
import Balance from 'models/Balance';
import YYYYMMDD from 'utils/YYYYMMDD';

const calculateBalance = (transactionsData: TransactionConfig[], estimatesData: TransactionConfig[]): Balance[] => {
  const transactions: Transaction[] =
    transactionsData
      .map(transaction => Transaction.buildFromTransactionData(transaction));
  const estimates: Transaction[] =
    estimatesData
      .map(transaction => Transaction.buildFromTransactionData(transaction));

  const startDates = transactions.concat(estimates).map((transaction: Transaction) => transaction.startDate.getTime());
  const endDates = transactions.concat(estimates).map((transaction: Transaction) => transaction.endDate ? transaction.endDate.getTime() : transaction.startDate.getTime());

  let minDate = new Date(Math.min.apply(null, startDates));
  let maxDate = new Date(Math.max.apply(null, endDates));

  // const today = new Date();

  // if (today < maxDate) {
  //   const todayUtcDate = new Date(Date.UTC(today.getFullYear(), today.getMonth() - 1, today.getDate()));

  //   const endValue = this.props.wallets.reduce((total, wallet: Wallet) => {
  //     total += wallet.balance;
  //     return total;
  //   }, 0)

  //   const forecastBeforeToday = new Forecast(minDate, firstMonthDay(todayUtcDate), { endValue });
  //   const forecastAfterToday = new Forecast(firstMonthDay(todayUtcDate), maxDate, { initialValue: endValue });

  //   console.log([
  //     calculateReverseBalance(forecastBeforeToday, transactions),
  //     calculateForecastBalance(forecastAfterToday, transactions),
  //   ]);

  // }

  const forecast: Forecast = new Forecast(minDate, maxDate, { initialValue: 0 });
  const balance: Balance[] = calculateForecastBalance(forecast, transactions);

  const forecastStartValue = balance && balance.length ? "" + balance[0].actualValue : "0";

  const estimateForecast: Forecast = new Forecast(minDate, maxDate, { initialValue: +forecastStartValue });
  const estimatesBalance = calculateForecastBalance(estimateForecast, estimates);

  balance.forEach((monthBalance: Balance) => {
    const estimate = estimatesBalance.find((month: Balance) => monthBalance.date && month.date && YYYYMMDD(month.date) === YYYYMMDD(monthBalance.date) ? true : false);

    if (estimate) {
      monthBalance.estimateValue = monthBalance.actualValue && estimate.actualValue ? monthBalance.actualValue + (estimate.actualValue - +forecastStartValue) : estimate.actualValue;
    }
  });

  return balance;
}

export default connect(
  (state: any) => {
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
      balance: calculateBalance(transactions, estimatesTransactions)
    }
  }
)(Timeline);
