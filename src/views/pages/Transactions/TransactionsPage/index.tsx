import React from 'react';
import { connect } from 'react-redux';
import { getGlobalFiltersSelector } from 'state/ducks/financial-forecast/financialSelectors';
import { createTag, getTagsSelector } from 'state/ducks/tags';
import {
  getAllTransactionsSelector,
  getTransactionsFiltersSelector,
  getTransactionsSelectedSelector,
} from 'state/ducks/transactions';
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
import { TRANSACTIONS } from 'state/reducerFactory/transactionsReducerFactory/transactionsReducersKeys';
import passesGlobalFilters from 'state/reducerFactory/transactionsReducerFactory/utils/passesGlobalFilters';


const Transactions = ({ TransactionsComponent, ...props }: any) => <TransactionsComponent {...props} />;

export default connect(
  (state: any, props: any) => {
    let transactions;

    if (!props.transactions) {
      const globalFilters = getGlobalFiltersSelector(state);
      const filter = passesGlobalFilters(globalFilters);
      const allTransactions = getAllTransactionsSelector(state);
      transactions = allTransactions.filter(filter);
    }

    return {
      selectedTransactions: getTransactionsSelectedSelector(state),
      transactions: props.transactions || transactions,
      tags: getTagsSelector(state),
      filters: getTransactionsFiltersSelector(state),
      wallets: getWalletsSelector(state),
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
