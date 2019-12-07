import React from 'react';
import { connect } from "react-redux";

import { Wallet } from "models/Wallet";

import Props from './DashboardProps';
import Dashboard from "./Dashboard";
import Balance from 'models/Balance';
import calculateWalletsTransactionsBalance from 'models/calculateWalletsTransactionsBalance';
import { generateRandomSeedAction } from 'state/middlewares/generateRandomSeedMiddleware';
import { getTagsSelector } from 'state/ducks/tags';

const DashboardContainer = (props: Props) => (
  <Dashboard {...props} />
)



export default connect(
  (state: any) => {
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
      balance
    };
  }, {
  loadSampleData: generateRandomSeedAction,
}
)(DashboardContainer)
