import React, { Fragment } from 'react';
import { NavLink as RRNavLink } from 'react-router-dom';
import Nav from 'reactstrap/lib/Nav';
import NavLink from 'reactstrap/lib/NavLink';

import { Tag } from 'models/Tag';
import Jumbotron from 'reactstrap/lib/Jumbotron';
import TransactionConfig from 'models/Transaction/TransactionConfig';
import { WalletConfig } from 'state/ducks/wallets';
import { connect } from 'react-redux';
import { bulkAddTransactions } from 'state/ducks/financial-forecast/actions';
import { generateRandomData } from 'models/Seed/generateRandomData';

interface Props {
  wallets?: WalletConfig[],
  tags?: Tag[],
  transactions?: TransactionConfig[],
  estimates?: TransactionConfig[],
  bulkAddTransactions: (transactions: TransactionConfig[]) => any
}

export default connect(null, {
  bulkAddTransactions: bulkAddTransactions("TRANSACTIONS")
})((props: Props) => {

  const links = [];

  if (props.wallets && !props.wallets.length) {
    links.push({
      link: '/wallets',
      label: 'Add wallets'
    });
  }

  if (props.tags && !props.tags.length) {
    links.push({
      link: '/tags',
      label: 'Add tags'
    });
  }

  if (props.transactions && !props.transactions.length) {
    links.push({
      link: '/transactions',
      label: 'Add transactions'
    });
  }

  if (props.estimates && !props.estimates.length) {
    links.push({
      link: '/estimates',
      label: 'Add estimates'
    });
  }

  if (!links.length) {
    return <Fragment />;
  }

  return (
    <Jumbotron id="onboarding">
      <h2>Start here</h2>
      <Nav vertical>
        {
          links.map((link) => (
            <NavLink tag={RRNavLink} exact to={link.link}>
              {link.label}
            </NavLink>
          ))
        }
        {/* <NavLink>
          <a href="javascript:void(0)" onClick={() => {
            const { transactions, tags} = generateRandomData(new Date(2018, 1, 1), new Date());
            props.bulkAddTransactions(transactions);
          }}>
            Load transactions sample
        </a>
        </NavLink> */}
      </Nav>
    </Jumbotron>
  );
});
