

import { localizeReducer as localize } from 'react-localize-redux';
import { combineReducers } from 'redux';
import { persistentReducer } from 'redux-pouchdb';

import authentication from './ducks/authentication';
import budgetsReducer from './ducks/budgets/budgetsReducer';
import contractsReducer from './ducks/contracts/contractsReducer';
import FinancialForecastReducer from './ducks/financial-forecast/reducers';
import rulesReducer from './ducks/rules';
import tagsReducer from './ducks/tags';
import walletsReducer from './ducks/wallets';

export default pouchdb => combineReducers({
  localize,
  authentication,
  financialForecast: FinancialForecastReducer,
  wallets: persistentReducer(pouchdb, 'wallets')(walletsReducer),
  tags: tagsReducer,
  rules: rulesReducer,
  contracts: contractsReducer,
  budgets: budgetsReducer,
});
