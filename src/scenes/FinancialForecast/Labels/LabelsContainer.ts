import { updateTransaction } from './../FinancialForecastActions';
import { createTag } from 'scenes/FinancialForecast/FinancialForecastActions';
import { connect } from 'react-redux';

import Labels from './Labels';

export default connect(
  (state: any) => {
    const { financialForecast: { transactions, tags } } = state;

    return {
      transactions: transactions && transactions.toJS(),
      tags: tags && tags.toJS()
    }
  },
  {
    createTag,
    updateTransaction,
  }
)(Labels)
