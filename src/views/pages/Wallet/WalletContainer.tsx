import { TransactionConfig } from 'models/Transaction/TransactionConfig';
import { Wallet } from 'models/Wallet';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import Breadcrumb from 'reactstrap/lib/Breadcrumb';
import BreadcrumbItem from 'reactstrap/lib/BreadcrumbItem';
import { getTransactionsSelector } from 'state/ducks/transactions/transactionsSelectors';
import { getWalletsSelector, updateWallet } from 'state/ducks/wallets';

import WalletComponent from './Wallet';

interface Props {
  wallet: Wallet;
  transactions: TransactionConfig[];
  update: typeof updateWallet;
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


const WalletContainer2 =
  withRouter(connect((state: any, props: any) => {
    const wallets = getWalletsSelector(state);
    let wallet: any;

    if (props.match.params && props.match.params.id) {
      wallet = wallets.find((wallet: Wallet) => wallet.id === props.match.params.id);
    }

    return {
      wallet,
      transactions: wallet ?
        getTransactionsSelector(state).filter((transaction: TransactionConfig) => transaction.wallet === wallet.id) :
        []
      ,
    };
  }, {
    update: updateWallet,
  })(WalletContainer));

export default () => <WalletContainer2 />;
