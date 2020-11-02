import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';

import Contracts from './Contracts';

storiesOf('Contracts', module)
  .add('default', () => (
    <Contracts
      createTag={action('createTag')}
      tags={[]}
      wallets={[]}
      createContract={action('create')}
      removeContract={action('remove')}
      contracts={[{
        description: 'water bill',
        startDate: new Date(2018, 1, 15),
        times: 6,
        valuePerTime: 10,
        totalValue: 60,
        interval: 1,
        tags: [],
        wallet: '',
        type: 'contract',
        useEndDate: false,
        useTotalValue: false,
      }]}
    />
  ));
