import { combineReducers } from 'redux';
import { localizeReducer as localize } from 'react-localize-redux';

import authentication from './ducks/authentication';
import FinancialForecastReducer from './ducks/financial-forecast/reducers';
import walletsReducer from './ducks/wallets';
import tagsReducer from './ducks/tags';
import rulesReducer from './ducks/rules';

const rootReducer = combineReducers({
	localize,
	authentication,
	financialForecast: FinancialForecastReducer,
	wallets: walletsReducer,
	tags: tagsReducer,
	rules: rulesReducer,
});

export default rootReducer;
