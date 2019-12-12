import { connect } from 'react-redux';

import WalletSelect from './WalletSelect';
import { createWallet } from 'state/ducks/wallets';

export default connect((state: any) => {
	const { wallets: { wallets } } = state;

	return {
		wallets: wallets && wallets.toJS(),
	};
}, {
	createWallet,
})(WalletSelect);
