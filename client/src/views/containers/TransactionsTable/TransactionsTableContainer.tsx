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
import { getTransactionsSelector } from 'state/ducks/financial-forecast/transactionsSelectors';
import { createTag, getTagsSelector } from 'state/ducks/tags';
import { getWalletsSelector } from 'state/ducks/wallets';

import TransactionsTable from './TransactionsTable';

export default connect(
  (state: any, props: any) => {
    const { financialForecast } = state;

    return {
      transactions: props.transactions || getTransactionsSelector(state),
      tags: getTagsSelector(state),
      filters: financialForecast.filters,
      wallets: getWalletsSelector(state),
      selected: (financialForecast.selected && financialForecast.selected) || {},
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
