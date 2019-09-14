import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import ImportTransactionsModal from './ImportTransactionsModal';

import 'bootstrap/dist/css/bootstrap.css';

storiesOf('ImportTransactionsModal', module)
  .add('default', () => (
    <ImportTransactionsModal
      opened
      close={action('closed')}
      save={action('save')}
      data={[]}
    />
  ));
