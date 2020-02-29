import { connect } from 'react-redux';
import { createWallet } from 'state/ducks/wallets';

import WalletSelect from './WalletSelect';

export default connect((state: any) => {
  const { wallets: { wallets } } = state;

  return {
    wallets: wallets && wallets.toJS(),
  };
}, {
  createWallet,
})(WalletSelect);
