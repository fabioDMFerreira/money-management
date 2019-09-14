import { connect } from 'react-redux';

import { updateForecast } from 'redux/ducks/financial-forecast/actions';

import Balance from './Balance';

export default connect(
  (state: any) => {
    const { financialForecast } = state;

    return {
      estimatesTransactions: financialForecast.estimatesTransactions && financialForecast.estimatesTransactions.toJS(),
      transactions: financialForecast.transactions && financialForecast.transactions.toJS(),
      filters: financialForecast.filters,
      forecast: financialForecast.forecast,
    }
  },
  {
    updateForecast,
  }
)(Balance);
