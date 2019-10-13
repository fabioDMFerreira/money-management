import React from 'react';
import { connect } from "react-redux";

import { Wallet } from "models/Wallet";

import Props from './DashboardProps';
import Dashboard from "./Dashboard";
import Transaction from 'models/Transaction';
import Forecast from 'models/Forecast';
import calculateForecastBalance from 'models/calculateForecastBalance';
import Balance from 'models/Balance';
import TransactionConfig from 'models/Transaction/TransactionConfig';
import calculateReverseBalance from 'models/Balance/calculateReverseBalance';
import { firstMonthDay, sumMonths } from 'models/utils';
import YYYYMMDD from 'utils/YYYYMMDD';

const DashboardContainer = (props: Props) => (
  <Dashboard {...props} />
)

const calculateBalance = (transactionsData: TransactionConfig[], wallets: Wallet[]): Balance[] => {
  const transactions: Transaction[] =
    transactionsData
      .map(transaction => Transaction.buildFromTransactionData(transaction));

  const startDates = transactions.map((transaction: Transaction) => transaction.startDate.getTime());
  const endDates = transactions.map((transaction: Transaction) => transaction.endDate ? transaction.endDate.getTime() : transaction.startDate.getTime());

  let minDate = new Date(Math.min.apply(null, startDates));
  let maxDate = new Date(Math.max.apply(null, endDates));

  const today = new Date();
  const todayUtcDate = new Date(Date.UTC(today.getFullYear(), today.getMonth() - 1, today.getDate()));
  const thisMonthFirstDay = firstMonthDay(todayUtcDate);


  const endValue = wallets.reduce((total, wallet: Wallet) => {
    total += wallet.balance;
    return total;
  }, 0)

  const forecastBeforeToday = new Forecast(minDate, thisMonthFirstDay, { endValue });
  const forecastAfterToday = new Forecast(sumMonths(thisMonthFirstDay, 1), maxDate, { initialValue: endValue });

  const balance = [
    ...calculateReverseBalance(forecastBeforeToday, transactions),
    ...calculateForecastBalance(forecastAfterToday, transactions),
  ];

  return balance;
}

export default connect(
  (state: any) => {
    const { financialForecast: { allTransactions, tags, estimatesAllTransactions }, wallets: { wallets } } = state;

    const balance: Balance[] =
      calculateBalance(allTransactions.toJS(), wallets.toJS()) || [];

    return {
      totalBalance: wallets ?
        wallets.toJS().reduce((total: number, wallet: Wallet) => {
          total += wallet.balance;

          return total;
        }, 0) :
        0,
      totalTransactions: allTransactions.size,
      totalTags: tags.size,
      totalWallets: wallets.size,
      totalEstimates: estimatesAllTransactions.size,
      lastTransactions: allTransactions.slice(0, 5),
      wallets: wallets.toJS() || [],
      allTransactions: allTransactions.toJS() || [],
      estimatesAllTransactions: estimatesAllTransactions.toJS() || [],
      tags: tags && tags.toJS(),
      balance
    };
  }
)(DashboardContainer)
