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
} from 'redux/ducks/financial-forecast/actions';

import { TRANSACTIONS } from 'redux/ducks/financial-forecast/consts';


const Transactions = ({ TransactionsComponent, ...props }: any) => <TransactionsComponent {...props} />

export default connect(
  (state: any) => {
    const { financialForecast } = state;

    return {
      transactions: financialForecast.transactions && financialForecast.transactions.toJS(),
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

    createTag,
  }
)(Transactions)
