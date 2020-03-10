import { connect } from 'react-redux';
import { createTag, getTagsSelector } from 'state/ducks/tags';
import { getTransactionsFiltersSelector, getTransactionsSelector } from 'state/ducks/transactions/transactionsSelectors';
import { getWalletsSelector } from 'state/ducks/wallets';
import {
  deleteTransaction,
  selectAllTransactions,
  selectTransaction,
  unselectAllTransactions,
  unselectTransaction,
  updateTransaction,
} from 'state/reducerFactory/transactionsReducerFactory/transactionsActionsFactory';
import { TRANSACTIONS } from 'state/reducerFactory/transactionsReducerFactory/transactionsReducersKeys';

import TransactionsTable from './TransactionsTable';

export default connect(
  (state: any, props: any) => ({
    transactions: props.transactions || getTransactionsSelector(state),
    tags: getTagsSelector(state),
    filters: getTransactionsFiltersSelector(state),
    wallets: getWalletsSelector(state),
    selected: getTransactionsFiltersSelector(state),
  }),
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
