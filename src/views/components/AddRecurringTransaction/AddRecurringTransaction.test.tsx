import { render } from '@testing-library/react';
import React from 'react';

import AddRecurringTransaction from './AddRecurringTransaction';

describe('components/AddRecurringTransaction', () => {
  it('should render and display label text', () => {
    const create = jest.fn();
    const createTag = jest.fn();
    render((
      <AddRecurringTransaction
        recurringTransactionType="contract"
        create={create}
        tags={[]}
        wallets={[]}
        createTag={createTag}
      />
    ));
  });
});
