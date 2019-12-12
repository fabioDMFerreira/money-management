import 'bootstrap/dist/css/bootstrap.css';

import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import React from 'react';

import AddRecurringTransaction from './AddRecurringTransaction';

export const actions = {
  // onPinTask: action('onPinTask'),
  // onArchiveTask: action('onArchiveTask'),
};

storiesOf('AddRecurringTransaction', module)
  .add('default', () => <AddRecurringTransaction />);
