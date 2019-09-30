import { combineReducers } from 'redux';
import { reducer as FormReducer } from 'redux-form';
import { localizeReducer as localize } from 'react-localize-redux';

import authentication from './ducks/authentication';
import FinancialForecastReducer from './ducks/financial-forecast/reducers';

const rootReducer = combineReducers({
	form: FormReducer,
	localize,
	authentication,
	financialForecast: FinancialForecastReducer,
});

export default rootReducer;
