import { render } from '@testing-library/react';
import React from 'react';

import RecurringTransactionModal from './RecurringTransactionModal';

describe('components/RecurringTransactionModal', () => {
  it('should render and display label text', () => {
    const save = jest.fn();
    const close = jest.fn();
    const createTag = jest.fn();

    render((
      <RecurringTransactionModal
        recurringTransactionType="contract"
        save={save}
        close={close}
        createTag={createTag}
        tags={[]}
        wallets={[]}
      />
    ));
  });
});
