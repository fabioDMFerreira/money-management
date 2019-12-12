

import { localizeReducer as localize } from 'react-localize-redux';
import { combineReducers } from 'redux';

import authentication from './ducks/authentication';
import FinancialForecastReducer from './ducks/financial-forecast/reducers';
import rulesReducer from './ducks/rules';
import tagsReducer from './ducks/tags';
import walletsReducer from './ducks/wallets';


const rootReducer = combineReducers({
  localize,
  authentication,
  financialForecast: FinancialForecastReducer,
  wallets: walletsReducer,
  tags: tagsReducer,
  rules: rulesReducer,
});

export default rootReducer;
