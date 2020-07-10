import { WALLETS } from 'locale/consts';
import { Wallet, WalletFactory } from 'models/Wallet';
import React, { Fragment } from 'react';
import { Translate } from 'react-localize-redux';
import { connect } from 'react-redux';
import Col from 'reactstrap/lib/Col';
import ListGroup from 'reactstrap/lib/ListGroup';
import ListGroupItem from 'reactstrap/lib/ListGroupItem';
import Row from 'reactstrap/lib/Row';
import { createWallet, getWalletsSelector } from 'state/ducks/wallets';
import NewButton from 'views/components/NewButton';

import WalletItem from './containers/WalletItem';

type Props = {
  wallets: Wallet[];
  createWallet: typeof createWallet;
}

const Settings = (props: Props) => (
  <Fragment>
    <div className="mb-4">
      <h3><Translate id={WALLETS} /></h3>
      <NewButton
        className="mb-2"
        onClick={() => {
          const wallet = WalletFactory.build('new wallet', 0);
          props.createWallet(wallet);
        }}
      />
      <ListGroup>
        <Row>
          {
            props.wallets && props.wallets.map((wallet: Wallet) => (
              <Col xs="4" key={wallet.id}>
                <ListGroupItem>
                  <WalletItem
                    wallet={wallet}
                  />
                </ListGroupItem>
              </Col>
            ))
          }
        </Row>
      </ListGroup>
    </div>
  </Fragment>
);

const WalletsContainer = connect(
  (state: any) => ({
    wallets: getWalletsSelector(state),
  }),
  {
    createWallet,
  },
)(Settings);

export default () => <WalletsContainer />;
