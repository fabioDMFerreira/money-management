import { connect } from 'react-redux';
import { createWallet, getWalletsSelector } from 'state/ducks/wallets';

import WalletSelect from './WalletSelect';

export default connect((state: any) => ({
  wallets: getWalletsSelector(state),
}), {
  createWallet,
})(WalletSelect);
