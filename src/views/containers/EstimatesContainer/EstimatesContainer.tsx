import { connect } from 'react-redux';
import { getEstimatesFiltersSelector, getEstimatesSelectedSelector, getEstimatesSelector } from 'state/ducks/estimates';
import { createTag, getTagsSelector } from 'state/ducks/tags';
import { createWallet, getWalletsSelector } from 'state/ducks/wallets';
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
} from 'state/reducerFactory/transactionsReducerFactory/transactionsActionsFactory';
import { ESTIMATES } from 'state/reducerFactory/transactionsReducerFactory/transactionsReducersKeys';

export default (Component: any) => connect(
  (state: any) => ({
    enableRecurringTransactions: true,
    selectedTransactions: getEstimatesSelectedSelector(state) || {},
    transactions: getEstimatesSelector(state) || [],
    tags: getTagsSelector(state),
    filters: getEstimatesFiltersSelector(state),
    wallets: getWalletsSelector(state),
  }),
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
  },
)(Component);
