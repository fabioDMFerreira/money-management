import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import 'bootstrap/dist/css/bootstrap.css';
import { Wallet } from 'models/Wallet';
import React from 'react';

import WalletSelect from './WalletSelect';

const wallets: Wallet[] = [
  {
    name: 'Bank 1',
    balance: 0,
    id: '1',
  }, {
    name: 'Bank 2',
    balance: 1000,
    id: '2',
  },
];

storiesOf('WalletSelect', module)
  .add('default', () => (
    <WalletSelect
      wallets={wallets}
      walletSelected=""
      onChange={action('change')}
      createWallet={(wallet: Wallet) => { action('create wallet')(wallet); }}
    />
  ));
