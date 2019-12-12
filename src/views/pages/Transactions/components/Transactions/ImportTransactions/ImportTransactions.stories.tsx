import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Wallet } from 'models/Wallet';

import ImportTransactions from './ImportTransactions';

import 'bootstrap/dist/css/bootstrap.css';

const wallets: Wallet[] = [
	{
		id: '1234',
		name: 'cgd',
		balance: 1000,
	}, {
		id: '2345',
		name: 'bpi',
		balance: 2000,
	},
];

storiesOf('ImportTransactions', module)
	.add('default', () => (
		<ImportTransactions
			save={
				(transactions: object[]) => {
					action('save')(transactions);
				}
			}
			wallets={wallets}
		/>
	));
