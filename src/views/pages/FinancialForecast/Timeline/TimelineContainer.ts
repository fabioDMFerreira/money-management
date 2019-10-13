import TransactionConfig from 'models/Transaction/TransactionConfig';
import { connect } from 'react-redux';

import { updateForecast } from 'state/ducks/financial-forecast/actions';

import Balance from './Timeline';
import passesFilters from './passesFilters';

export default connect(
  (state: any) => {
    const { financialForecast, wallets: { wallets } } = state;

    const transactions = financialForecast.transactions ?
      financialForecast
        .transactions.toJS()
        .filter((transaction: TransactionConfig) => transaction.visible)
        .filter(passesFilters(financialForecast.filters)) :
      [];

    const estimatesTransactions = financialForecast.estimatesTransactions ?
      financialForecast
        .estimatesTransactions.toJS()
        .filter((transaction: TransactionConfig) => transaction.visible)
        .filter(passesFilters(financialForecast.filters)) :
      [];

    return {
      estimatesTransactions,
      transactions,
      wallets: wallets ? wallets.toJS() : []
    }
  }
)(Balance);
