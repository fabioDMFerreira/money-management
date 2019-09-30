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
} from 'state/ducks/financial-forecast/actions';

import { ESTIMATES } from 'state/ducks/financial-forecast/consts';


const Transactions = ({ TransactionsComponent, ...props }: any) => <TransactionsComponent {...props} />

export default connect(
  (state: any) => {
    const { financialForecast } = state;

    return {
      transactions: financialForecast.estimatesTransactions && financialForecast.estimatesTransactions.toJS(),
      tags: financialForecast.tags && financialForecast.tags.toJS(),
      filters: financialForecast.estimatesFilters,
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

    createTag,
  }
)(Transactions)
