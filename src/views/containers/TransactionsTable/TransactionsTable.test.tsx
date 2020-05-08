import { render } from '@testing-library/react';
import React from 'react';

import TransactionsTable from './TransactionsTable';


describe('containers/TransactionsTable', () => {
  it('should render component', () => {
    render(<TransactionsTable transactions={[]} />);
  });
});
