import Transaction from 'models/Transaction';
import { TransactionConfig } from 'models/Transaction/TransactionConfig';
import React from 'react';
import { connect } from 'react-redux';
import { getEstimatesSelector } from 'state/ducks/estimates';
import { getGlobalFiltersSelector } from 'state/ducks/financial-forecast/financialSelectors';
import { getTransactionsFiltersSelector, getTransactionsSelector } from 'state/ducks/transactions';
import { getWalletsSelector } from 'state/ducks/wallets';
import passesGlobalFilters from 'state/reducerFactory/transactionsReducerFactory/utils/passesGlobalFilters';
import calculateTransactionsBalancesByMonth from 'usecases/calculateBalance/calculateTransactionsBalancesByMonth';

import passesFilters from './passesFilters';
import Timeline from './Timeline';

const TimelineContainer = connect((state: any) => {
  const filters = getTransactionsFiltersSelector(state);
  const globalFilters = getGlobalFiltersSelector(state);
  const filter = passesGlobalFilters(globalFilters);

  const transactions = getTransactionsSelector(state)
    .filter((transaction: TransactionConfig) => transaction.visible)
    .filter(passesFilters(filters))
    .filter(filter);

  const estimatesTransactions = getEstimatesSelector(state)
    .filter((transaction: TransactionConfig) => transaction.visible)
    .filter(passesFilters(filters))
    .filter(filter);

  const realTransactions = transactions.map((transaction: TransactionConfig) => Transaction.buildFromTransactionData(transaction));

  return {
    estimatesTransactions,
    transactions,
    wallets: getWalletsSelector(state),
    balance: calculateTransactionsBalancesByMonth(realTransactions),
  };
})(Timeline);

export default () => <TimelineContainer />;
