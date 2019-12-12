import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import BulkUpdateModal from './BulkUpdateModal';

import 'bootstrap/dist/css/bootstrap.css';
import { Wallet } from 'models/Wallet';

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

storiesOf('BulkUpdateModal', module)
	.add('default', () => (
		<BulkUpdateModal
			opened
			close={action('closed')}
			save={action('save')}
			tags={[
				{ label: 'tag 1', id: 'tag2' },
			]}
			wallets={wallets}
			createWallet={action('create wallet')}
			createTag={action('create tag')}
		/>
	));
