import React from 'react';
import { connect } from 'react-redux';

import {
	dragTransaction,
	deleteTransaction,
	addNewTransaction,
	bulkAddTransactions,
	updateTransaction,
	clearTransactions,
	updateTransactionsFilters,
	bulkDeleteTransactions,
	selectTransaction,
	unselectTransaction,
	selectAllTransactions,
	unselectAllTransactions,
} from 'state/ducks/financial-forecast/actions';

import { TRANSACTIONS } from 'state/ducks/financial-forecast/consts';
import { createWallet } from 'state/ducks/wallets';
import { getTagsSelector, createTag } from 'state/ducks/tags';


const Transactions = ({ TransactionsComponent, ...props }: any) => <TransactionsComponent {...props} />;

export default connect(
	(state: any, props: any) => {
		const { financialForecast, wallets } = state;

		return {
			selectedTransactions: financialForecast.selected && financialForecast.selected.toJS() || {},
			transactions: props.transactions || financialForecast.transactions && financialForecast.transactions.toJS(),
			tags: getTagsSelector(state),
			filters: financialForecast.filters,
			wallets: wallets.wallets && wallets.wallets.toJS(),
		};
	},
	{
		addNewTransaction: addNewTransaction(TRANSACTIONS),
		bulkAddTransactions: bulkAddTransactions(TRANSACTIONS),
		bulkDeleteTransactions: bulkDeleteTransactions(TRANSACTIONS),
		updateTransaction: updateTransaction(TRANSACTIONS),
		deleteTransaction: deleteTransaction(TRANSACTIONS),
		clearTransactions: clearTransactions(TRANSACTIONS),
		dragTransaction: dragTransaction(TRANSACTIONS),
		updateTransactionsFilters: updateTransactionsFilters(TRANSACTIONS),
		selectTransaction: selectTransaction(TRANSACTIONS),
		unselectTransaction: unselectTransaction(TRANSACTIONS),
		selectAllTransactions: selectAllTransactions(TRANSACTIONS),
		unselectAllTransactions: unselectAllTransactions(TRANSACTIONS),

		createWallet,
		createTag,
	},
)(Transactions);
