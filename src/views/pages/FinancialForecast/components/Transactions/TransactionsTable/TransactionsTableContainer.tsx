import { connect } from 'react-redux';

import TransactionsTable from './TransactionsTable';
import {
  dragTransaction,
  createTag,
  deleteTransaction,
  updateTransaction,
  selectTransaction,
  unselectTransaction,
  selectAllTransactions,
  unselectAllTransactions,
} from 'state/ducks/financial-forecast/actions';

import { TRANSACTIONS } from 'state/ducks/financial-forecast/consts';

export default connect(
  (state: any, props: any) => {
    const { financialForecast, wallets: { wallets } } = state;

    return {
      transactions: props.transactions || (financialForecast.transactions && financialForecast.transactions.toJS()),
      tags: financialForecast.tags && financialForecast.tags.toJS(),
      filters: financialForecast.filters,
      wallets: wallets && wallets.toJS(),
      selected: financialForecast.selected && financialForecast.selected.toJS() || {}
    }
  },
  {
    updateTransaction: updateTransaction(TRANSACTIONS),
    deleteTransaction: deleteTransaction(TRANSACTIONS),
    // dragTransaction: dragTransaction(TRANSACTIONS),
    select: selectTransaction(TRANSACTIONS),
    unselect: unselectTransaction(TRANSACTIONS),
    selectAll: selectAllTransactions(TRANSACTIONS),
    unselectAll: unselectAllTransactions(TRANSACTIONS),

    createTag,
  }
)(TransactionsTable)
