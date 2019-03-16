import { connect } from 'react-redux';

import { updateForecast } from './../FinancialForecastActions';

import Balance from './Balance';

export default connect(
  (state: any) => {
    const { financialForecast } = state;

    return {
      transactions: financialForecast.transactions && financialForecast.transactions.toJS(),
      filters: financialForecast.filters,
      forecast: financialForecast.forecast,
    }
  },
  {
    updateForecast,
  }
)(Balance);
