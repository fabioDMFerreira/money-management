import React, { Fragment } from "react";
import { Wallet } from "models/Wallet";
import TransactionConfig from "models/Transaction/TransactionConfig";

import WalletComponent from "./Wallet";
import { connect } from "react-redux";
import { withRouter, RouterProps } from "react-router";
import Breadcrumb from "reactstrap/lib/Breadcrumb";
import BreadcrumbItem from "reactstrap/lib/BreadcrumbItem";
import { Link } from "react-router-dom";
import { updateWallet } from "state/ducks/wallets";

interface Props {
  wallet: Wallet,
  transactions: TransactionConfig[],
  update: typeof updateWallet
}

const WalletContainer = ({ wallet, transactions, update }: Props) => (
  <Fragment>
    {
      wallet &&
      <Fragment>
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/wallets">Wallets</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>{wallet.name}</BreadcrumbItem>
        </Breadcrumb>
        <WalletComponent wallet={wallet} transactions={transactions} update={update} />
      </Fragment>
    }
  </Fragment>
);

export default
  withRouter(
    connect(
      (state: any, props: any) => {
        const { financialForecast: { transactions: stateTransactions }, wallets: { wallets } } = state;
        let wallet: any;

        if (props.match.params && props.match.params.id) {
          wallet = wallets.find((wallet: Wallet) => wallet.id === props.match.params.id);
        }

        return {
          wallet,
          transactions: wallet ?
            stateTransactions.filter((transaction: TransactionConfig) => {
              return transaction.wallet === wallet.id;
            }).toJS() :
            []
          ,
        };
      }, {
      update: updateWallet
    }
    )(WalletContainer)
  )
