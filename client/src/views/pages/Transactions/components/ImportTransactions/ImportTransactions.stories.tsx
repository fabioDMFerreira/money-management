import 'bootstrap/dist/css/bootstrap.css';

import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import { Wallet } from 'models/Wallet';
import React from 'react';

import ImportTransactions from './ImportTransactions';

const wallets: Wallet[] = [
  {
    id: '1234',
    name: 'cgd',
    balance: 1000,
  }, {
    id: '2345',
    name: 'bpi',
    balance: 2000,
  },
];

storiesOf('ImportTransactions', module)
  .add('default', () => (
    <ImportTransactions
      save={
        (transactions: object[]) => {
          action('save')(transactions);
        }
      }
      wallets={wallets}
    />
  ));
