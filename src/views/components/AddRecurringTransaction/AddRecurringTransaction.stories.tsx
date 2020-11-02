import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';

import AddRecurringTransaction from './AddRecurringTransaction';

export const actions = {
  create: action('create'),
};

storiesOf('AddRecurringTransaction', module)
  .add('default', () => <AddRecurringTransaction {...actions} tags={[]} wallets={[]} createTag={() => true} recurringTransactionType="contract" />);
