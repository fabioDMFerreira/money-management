

import { localizeReducer as localize } from 'react-localize-redux';
import { combineReducers } from 'redux';
import { persistentReducer } from 'redux-pouchdb-per-reducer';

import authentication from './ducks/authentication';
import budgetsReducer from './ducks/budgets/budgetsReducer';
import contractsReducer from './ducks/contracts/contractsReducer';
import estimatesReducer from './ducks/estimates';
import FinancialForecastReducer from './ducks/financial-forecast/financialReducer';
import rulesReducer from './ducks/rules';
import tagsReducer from './ducks/tags';
import transactionsReducer from './ducks/transactions';
import walletsReducer from './ducks/wallets';

export default pouchdb => combineReducers({
  localize,
  authentication,
  financialForecast: persistentReducer(pouchdb, 'financialForecast')(FinancialForecastReducer),
  wallets: persistentReducer(pouchdb, 'wallets')(walletsReducer),
  tags: persistentReducer(pouchdb, 'tags')(tagsReducer),
  rules: persistentReducer(pouchdb, 'rules')(rulesReducer),
  contracts: persistentReducer(pouchdb, 'contracts')(contractsReducer),
  budgets: persistentReducer(pouchdb, 'budgets')(budgetsReducer),
  transactions: persistentReducer(pouchdb, 'transactions')(transactionsReducer),
  estimates: persistentReducer(pouchdb, 'estimates')(estimatesReducer),
});
