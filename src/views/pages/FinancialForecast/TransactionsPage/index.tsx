import React from 'react';
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

import { TRANSACTIONS } from 'state/ducks/financial-forecast/consts';


const Transactions = ({ TransactionsComponent, ...props }: any) => <TransactionsComponent {...props} />

export default connect(
  (state: any, props:any) => {
    const { financialForecast } = state;

    return {
      selectedTransactions: financialForecast.selected && financialForecast.selected.toJS() || {},
      transactions: props.transactions || financialForecast.transactions && financialForecast.transactions.toJS(),
      tags: financialForecast.tags && financialForecast.tags.toJS(),
      filters: financialForecast.filters,
    }
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

    createTag,
  }
)(Transactions)
