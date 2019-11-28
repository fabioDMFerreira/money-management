import { updateGlobalFilter, createTag } from 'state/ducks/financial-forecast/actions';
import { connect } from 'react-redux';

import GlobalFilters from './GlobalFilters';

export default connect(
  (state: any) => {
    const {
      financialForecast: {
        globalFilters,
        transactions,
        allTransactions,
      }
    } = state;

    return {
      globalFilters,
      transactionsCount: transactions && transactions.size,
      allTransactionsCount: allTransactions && allTransactions.size,
    }
  }, {
  updateGlobalFilter,
}
)(GlobalFilters)
