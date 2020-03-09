import { Balance } from 'models/Balance';
import { Wallet } from 'models/Wallet';
import React from 'react';
import { connect } from 'react-redux';
import { getTagsSelector } from 'state/ducks/tags';
import { getWalletsSelector } from 'state/ducks/wallets';
import { generateRandomSeedAction } from 'state/middlewares/generateRandomSeedMiddleware';
import calculateWalletsTransactionsBalance from 'usecases/calculateBalance/calculateWalletsTransactionsBalance';

import Dashboard from './Dashboard';

const DashboardContainer = connect((state: any) => {
  const { financialForecast: { allTransactions, estimatesAllTransactions } } = state;
  const wallets = getWalletsSelector(state);
  const tags = getTagsSelector(state);
  const balance: Balance[] =
    calculateWalletsTransactionsBalance(allTransactions, wallets) || [];

  return {
    totalBalance: wallets ?
      wallets.reduce((total: number, wallet: Wallet) => {
        total += wallet.balance;

        return total;
      }, 0) :
      0,
    totalTransactions: allTransactions.size,
    totalTags: tags.length,
    totalWallets: wallets.length,
    totalEstimates: estimatesAllTransactions.size,
    lastTransactions: allTransactions.slice(0, 5),
    wallets,
    allTransactions: allTransactions || [],
    estimatesAllTransactions: estimatesAllTransactions || [],
    tags,
    balance,
  };
}, {
  loadSampleData: generateRandomSeedAction,
})(Dashboard);

export default () => <DashboardContainer />;
