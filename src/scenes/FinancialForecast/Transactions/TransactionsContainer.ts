import {
  dragTransaction,
  createTag,
  deleteTransaction,
  addNewTransaction,
  bulkAddTransactions,
  updateTransaction,
  clearTransactions,
  updateTransactionsFilters
} from 'scenes/FinancialForecast/FinancialForecastActions';
import { connect } from 'react-redux';

import Transactions from './Transactions';

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
    addNewTransaction,
    bulkAddTransactions,
    updateTransaction,
    deleteTransaction,
    clearTransactions,
    dragTransaction,
    createTag,
    updateTransactionsFilters,
  }
)(Transactions)
