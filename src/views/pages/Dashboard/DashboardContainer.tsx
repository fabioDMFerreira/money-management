import { Balance } from 'models/Balance';
import calculateWalletsTransactionsBalance from 'models/calculateWalletsTransactionsBalance';
import { Wallet } from 'models/Wallet';
import React from 'react';
import { connect } from 'react-redux';
import { getTagsSelector } from 'state/ducks/tags';
import { generateRandomSeedAction } from 'state/middlewares/generateRandomSeedMiddleware';

import Dashboard from './Dashboard';
import { DashboardProps } from './DashboardProps';

const DashboardContainer = (props: DashboardProps) => (
  <Dashboard {...props} />
);


export default connect((state: any) => {
  const { financialForecast: { allTransactions, estimatesAllTransactions }, wallets: { wallets } } = state;
  const tags = getTagsSelector(state);
  const balance: Balance[] =
    calculateWalletsTransactionsBalance(allTransactions.toJS(), wallets.toJS()) || [];

  return {
    totalBalance: wallets ?
      wallets.toJS().reduce((total: number, wallet: Wallet) => {
        total += wallet.balance;

        return total;
      }, 0) :
      0,
    totalTransactions: allTransactions.size,
    totalTags: tags.length,
    totalWallets: wallets.size,
    totalEstimates: estimatesAllTransactions.size,
    lastTransactions: allTransactions.slice(0, 5),
    wallets: wallets.toJS() || [],
    allTransactions: allTransactions.toJS() || [],
    estimatesAllTransactions: estimatesAllTransactions.toJS() || [],
    tags,
    balance,
  };
}, {
  loadSampleData: generateRandomSeedAction,
})(DashboardContainer);
