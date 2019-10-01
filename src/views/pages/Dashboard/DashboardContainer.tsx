import React from 'react';
import { connect } from "react-redux";

import { Wallet } from "models/Wallet";

import Props from './DashboardProps';
import Dashboard from "./Dashboard";

const DashboardContainer = (props: Props) => (
  <Dashboard {...props} />
)

export default connect(
  (state: any) => {
    const { financialForecast: { allTransactions, tags }, wallets: { wallets } } = state;

    return {
      totalBalance: wallets ?
        wallets.toJS().reduce((total: number, wallet: Wallet) => {
          total += wallet.balance;

          return total;
        }, 0) :
        0,
      totalTransactions: allTransactions.size,
      totalTags: tags.size
    };
  }
)(DashboardContainer)
