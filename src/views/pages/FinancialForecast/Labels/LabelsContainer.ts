import { updateTransaction } from 'redux/ducks/financial-forecast/actions';
import { createTag } from 'redux/ducks/financial-forecast/actions';
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
