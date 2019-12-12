import { connect } from 'react-redux';
import { updateGlobalFilter } from 'state/ducks/financial-forecast/actions';
import { createTag } from 'state/ducks/tags';

import GlobalFilters from './GlobalFilters';

export default connect((state: any) => {
  const {
    financialForecast: {
      globalFilters,
      transactions,
      allTransactions,
    },
  } = state;

  return {
    globalFilters,
    transactionsCount: transactions && transactions.size,
    allTransactionsCount: allTransactions && allTransactions.size,
  };
}, {
  updateGlobalFilter,
})(GlobalFilters);
