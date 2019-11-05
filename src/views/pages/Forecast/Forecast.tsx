import React, { Component, Fragment } from "react";
import Timeline from "../FinancialForecast/Timeline/Timeline";
import { Wallet } from "models/Wallet";
import Balance from "models/Balance";
import TransactionConfig from "models/Transaction/TransactionConfig";
import { connect } from "react-redux";
import calculateTransactionsEstimatesBalance from "models/calculateTransactionsEstimatesBalance";
import Estimates from "../../hocs/EstimatesContainerHoc";
import Transactions from "../FinancialForecast/components/Transactions";

interface Props {
  wallets: [Wallet],
  balance: Balance[]
  allTransactions: [TransactionConfig],
  allEstimates: [TransactionConfig],
}

const EstimatesComponent = Estimates(Transactions);


const Forecast = ({ balance, allTransactions, allEstimates, wallets }: Props) => (
  <Fragment>
    <h2>Forecast</h2>
    <hr />
    <Timeline
      balance={balance}
      transactions={allTransactions}
    />
    <div className="mt-1">
      <h4>Estimates</h4>
    </div>
    <EstimatesComponent />
  </Fragment>
)

export default connect((state: any) => {
  const { financialForecast: { allTransactions, tags, estimatesAllTransactions }, wallets: { wallets } } = state;

  const balance: Balance[] =
    calculateTransactionsEstimatesBalance(allTransactions.toJS(), estimatesAllTransactions.toJS(), wallets.toJS()) || [];

  return {
    balance,
    wallets: wallets.toJS() || [],
    allTransactions: allTransactions.toJS() || [],
    allEstimates: estimatesAllTransactions.toJS() || [],
  }
})(Forecast)
