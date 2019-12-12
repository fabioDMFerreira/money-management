import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Wallet } from 'models/Wallet';

import WalletSelect from './WalletSelect';

import 'bootstrap/dist/css/bootstrap.css';

const wallets: Wallet[] = [
	{
		name: 'Bank 1',
		balance: 0,
		id: '1',
	}, {
		name: 'Bank 2',
		balance: 1000,
		id: '2',
	},
];

storiesOf('WalletSelect', module)
	.add('default', () => (
		<WalletSelect
			wallets={wallets}
			walletSelected=""
			onChange={action('change')}
			createWallet={(wallet: Wallet) => { action('create wallet')(wallet); }}
		/>
	));
