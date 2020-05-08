import { render } from '@testing-library/react';
import React from 'react';

import WalletSelect from './WalletSelect';


describe('containers/WalletSelect', () => {
  it('should render component', () => {
    const onChange = jest.fn();
    const createWallet = jest.fn();
    render((
      <WalletSelect onChange={onChange} createWallet={createWallet} wallets={[]} walletSelected={undefined} />
    ));
  });
});
