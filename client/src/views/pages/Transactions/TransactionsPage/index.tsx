import React from 'react';
import { connect } from 'react-redux';
import {
  addNewTransaction,
  bulkAddTransactions,
  bulkDeleteTransactions,
  clearTransactions,
  deleteTransaction,
  dragTransaction,
  selectAllTransactions,
  selectTransaction,
  unselectAllTransactions,
  unselectTransaction,
  updateTransaction,
  updateTransactionsFilters,
} from 'state/ducks/financial-forecast/actions';
import { TRANSACTIONS } from 'state/ducks/financial-forecast/consts';
import { createTag, getTagsSelector } from 'state/ducks/tags';
import { createWallet } from 'state/ducks/wallets';


const Transactions = ({ TransactionsComponent, ...props }: any) => <TransactionsComponent {...props} />;

export default connect(
  (state: any, props: any) => {
    const { financialForecast, wallets } = state;

    return {
      selectedTransactions: (financialForecast.selected && financialForecast.selected.toJS()) || {},
      transactions: props.transactions || ((financialForecast.transactions && financialForecast.transactions.toJS()) || []),
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
