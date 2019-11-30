import { connect } from 'react-redux';

import {
  dragTransaction,
  createTag,
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

import { ESTIMATES } from 'state/ducks/financial-forecast/consts';
import { createWallet } from 'state/ducks/wallets';

export default (Component: any) => connect(
  (state: any) => {
    const { financialForecast, wallets } = state;

    return {
      enableRecurringTransactions: true,
      selectedTransactions: financialForecast.estimatesSelected && financialForecast.estimatesSelected.toJS() || {},
      transactions: financialForecast.estimatesTransactions && financialForecast.estimatesTransactions.toJS(),
      tags: financialForecast.tags && financialForecast.tags.toJS(),
      filters: financialForecast.estimatesFilters,
      wallets: wallets && wallets.toJS()
    }
  },
  {
    addNewTransaction: addNewTransaction(ESTIMATES),
    bulkAddTransactions: bulkAddTransactions(ESTIMATES),
    bulkDeleteTransactions: bulkDeleteTransactions(ESTIMATES),
    updateTransaction: updateTransaction(ESTIMATES),
    deleteTransaction: deleteTransaction(ESTIMATES),
    clearTransactions: clearTransactions(ESTIMATES),
    dragTransaction: dragTransaction(ESTIMATES),
    updateTransactionsFilters: updateTransactionsFilters(ESTIMATES),
    selectTransaction: selectTransaction(ESTIMATES),
    unselectTransaction: unselectTransaction(ESTIMATES),
    selectAllTransactions: selectAllTransactions(ESTIMATES),
    unselectAllTransactions: unselectAllTransactions(ESTIMATES),

    createTag,
    createWallet,
  }
)(Component)
