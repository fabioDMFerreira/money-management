import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import ListGroup from 'reactstrap/lib/ListGroup';
import ListGroupItem from 'reactstrap/lib/ListGroupItem';
import Row from 'reactstrap/lib/Row';
import Col from 'reactstrap/lib/Col';

import { Wallet, WalletFactory } from 'models/Wallet';
import WalletItem from './containers/WalletItem';
import { createWallet } from 'state/ducks/wallets';
import NewButton from 'views/components/NewButton';

type Props = {
  wallets: Wallet[],
  createWallet: typeof createWallet,
}

const Settings = (props: Props) =>
  <Fragment>
    <div className="mb-4">
      <h3>Wallets</h3>
      <NewButton className="mb-2" onClick={() => {
        const wallet = WalletFactory.build("new wallet", 0);
        props.createWallet(wallet);
      }} />
      <ListGroup>
        <Row>
          {
            props.wallets && props.wallets.map((wallet: Wallet) => <Col xs="4" key={wallet.id}>
              <ListGroupItem>
                <WalletItem
                  wallet={wallet}
                />
              </ListGroupItem>
            </Col>)
          }
        </Row>
      </ListGroup>
    </div>
  </Fragment>

export default connect(
  (state: any) => {
    const { wallets: { wallets } } = state;

    return {
      wallets: wallets && wallets.toJS()
    }
  }
  , {
    createWallet,
  })(Settings);
