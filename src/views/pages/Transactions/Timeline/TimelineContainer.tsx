import Transaction from 'models/Transaction';
import { TransactionConfig } from 'models/Transaction/TransactionConfig';
import React from 'react';
import { connect } from 'react-redux';
import { getEstimatesSelector, getTransactionsSelector } from 'state/ducks/financial-forecast/transactionsSelectors';
import { getWalletsSelector } from 'state/ducks/wallets';
import calculateTransactionsBalancesByMonth from 'usecases/calculateBalance/calculateTransactionsBalancesByMonth';

import passesFilters from './passesFilters';
import Timeline from './Timeline';

const TimelineContainer = connect((state: any) => {
  const { financialForecast } = state;

  const transactions = getTransactionsSelector(state)
    .filter((transaction: TransactionConfig) => transaction.visible)
    .filter(passesFilters(financialForecast.filters));

  const estimatesTransactions = getEstimatesSelector(state)
    .filter((transaction: TransactionConfig) => transaction.visible)
    .filter(passesFilters(financialForecast.filters));

  const realTransactions = transactions.map((transaction: TransactionConfig) => Transaction.buildFromTransactionData(transaction));

  return {
    estimatesTransactions,
    transactions,
    wallets: getWalletsSelector(state),
    balance: calculateTransactionsBalancesByMonth(realTransactions),
  };
})(Timeline);

export default () => <TimelineContainer />;
