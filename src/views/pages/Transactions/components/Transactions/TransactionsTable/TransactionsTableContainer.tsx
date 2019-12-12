import { connect } from 'react-redux';
import {
  deleteTransaction,
  selectAllTransactions,
  selectTransaction,
  unselectAllTransactions,
  unselectTransaction,
  updateTransaction,
} from 'state/ducks/financial-forecast/actions';
import { TRANSACTIONS } from 'state/ducks/financial-forecast/consts';
import { createTag, getTagsSelector } from 'state/ducks/tags';

import TransactionsTable from './TransactionsTable';

export default connect(
  (state: any, props: any) => {
    const { financialForecast, wallets: { wallets } } = state;

    return {
      transactions: props.transactions || (financialForecast.transactions && financialForecast.transactions.toJS()),
      tags: getTagsSelector(state),
      filters: financialForecast.filters,
      wallets: wallets && wallets.toJS(),
      selected: (financialForecast.selected && financialForecast.selected.toJS()) || {},
    };
  },
  {
    updateTransaction: updateTransaction(TRANSACTIONS),
    removeTransaction: deleteTransaction(TRANSACTIONS),
    // dragTransaction: dragTransaction(TRANSACTIONS),
    select: selectTransaction(TRANSACTIONS),
    unselect: unselectTransaction(TRANSACTIONS),
    selectAll: selectAllTransactions(TRANSACTIONS),
    unselectAll: unselectAllTransactions(TRANSACTIONS),

    createTag,
  },
)(TransactionsTable);
