import { combineReducers } from 'redux';
import { reducer as FormReducer } from 'redux-form';
import { localizeReducer as localize } from 'react-localize-redux';

import authentication from './ducks/authentication';
import FinancialForecastReducer from './ducks/financial-forecast/reducers';
import walletsReducer from './ducks/wallets';

const rootReducer = combineReducers({
	form: FormReducer,
	localize,
	authentication,
	financialForecast: FinancialForecastReducer,
	wallets: walletsReducer,
});

export default rootReducer;
