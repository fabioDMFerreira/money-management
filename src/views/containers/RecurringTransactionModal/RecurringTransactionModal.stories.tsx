import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import RecurringTransactionModal from './RecurringTransactionModal';

import 'bootstrap/dist/css/bootstrap.css';

export const actions = {
  close: action('close'),
  save: action('save'),
};

storiesOf('RecurringTransactionModal', module)
  .add('default', () => <RecurringTransactionModal {...actions} />)
