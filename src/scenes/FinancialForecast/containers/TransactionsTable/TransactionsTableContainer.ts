import { connect } from 'react-redux';

import { createTag } from 'scenes/FinancialForecast/FinancialForecastActions';
import {
  updateTransaction,
  deleteTransaction,
  dragTransaction
} from './../../FinancialForecastActions';

import TransactionsTable from './TransactionsTable';

export default connect((state: any) => {
  const { financialForecast: {
    tags
  } } = state;

  return {
    tags: tags && tags.toJS(),
  }
}, {
    createTag,
    updateTransaction,
    removeTransaction: deleteTransaction,
    dragTransaction
  })(TransactionsTable);
