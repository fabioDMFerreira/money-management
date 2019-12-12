import 'bootstrap/dist/css/bootstrap.css';

import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import React from 'react';

import RecurringTransactionModal from './RecurringTransactionModal';

export const actions = {
  close: action('close'),
  save: action('save'),
};

storiesOf('RecurringTransactionModal', module)
  .add('default', () => <RecurringTransactionModal {...actions} />);
