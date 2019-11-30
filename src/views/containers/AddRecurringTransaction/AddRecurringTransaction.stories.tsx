import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import AddRecurringTransaction from './AddRecurringTransaction';

import 'bootstrap/dist/css/bootstrap.css';

export const actions = {
  // onPinTask: action('onPinTask'),
  // onArchiveTask: action('onArchiveTask'),
};

storiesOf('AddRecurringTransaction', module)
  .add('default', () => <AddRecurringTransaction />)
