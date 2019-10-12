import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import ListGroup from 'reactstrap/lib/ListGroup';
import ListGroupItem from 'reactstrap/lib/ListGroupItem';
import Row from 'reactstrap/lib/Row';
import Col from 'reactstrap/lib/Col';

import { Tag } from 'models/Tag';
import { Wallet, WalletFactory } from 'models/Wallet';
import TagItem from './containers/TagItem';
import WalletItem from './containers/WalletItem';
import { createWallet } from 'state/ducks/wallets';
import { createTag } from 'state/ducks/financial-forecast/actions';
import NewButton from 'views/components/NewButton';

type Props = {
  tags: Tag[],
  wallets: Wallet[],
  createWallet: typeof createWallet,
  createTag: typeof createTag,
}

const Settings = (props: Props) =>
  <Fragment>
    <div className="mb-4">
      <h3>Tags</h3>
      <NewButton className="mb-2" onClick={() => {
        props.createTag({ label: 'new tag', id: 'new tag' });
      }} />
      <ListGroup>
        <Row>
          {
            props.tags && props.tags.map((tag: Tag) => <Col xs="4" key={tag.label}>
              <ListGroupItem>
                <TagItem
                  tag={tag}
                />
              </ListGroupItem>
            </Col>)
          }
        </Row>
      </ListGroup>
    </div>
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
    const { financialForecast: { tags }, wallets: { wallets } } = state;

    return {
      tags: tags && tags.toJS(),
      wallets: wallets && wallets.toJS()
    }
  }
  , {
    createWallet,
    createTag
  })(Settings);
