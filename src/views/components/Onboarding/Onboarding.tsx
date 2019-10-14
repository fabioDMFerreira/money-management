import React, { Fragment } from 'react';
import { NavLink as RRNavLink } from 'react-router-dom';
import Nav from 'reactstrap/lib/Nav';
import NavLink from 'reactstrap/lib/NavLink';

import { Tag } from 'models/Tag';
import Jumbotron from 'reactstrap/lib/Jumbotron';
import TransactionConfig from 'models/Transaction/TransactionConfig';
import { WalletConfig } from 'state/ducks/wallets';

interface Props {
  wallets?: WalletConfig[],
  tags?: Tag[],
  transactions?: TransactionConfig[],
  estimates?: TransactionConfig[]
}

export default (props: Props) => {

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
    <Jumbotron>
      <h2>Start here</h2>
      <Nav vertical>
        {
          links.map((link) => (
            <NavLink tag={RRNavLink} exact to={link.link}>
              {link.label}
            </NavLink>
          ))
        }
      </Nav>
    </Jumbotron>
  );
};
