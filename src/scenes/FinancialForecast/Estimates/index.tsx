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
} from '../state/FinancialForecastActions';

import { ESTIMATES } from '../state/consts';


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
    updateTransaction: updateTransaction(ESTIMATES),
    deleteTransaction: deleteTransaction(ESTIMATES),
    clearTransactions: clearTransactions(ESTIMATES),
    dragTransaction: dragTransaction(ESTIMATES),
    updateTransactionsFilters: updateTransactionsFilters(ESTIMATES),

    createTag,
  }
)(Transactions)
