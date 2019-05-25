import { combineReducers } from 'redux';
import { reducer as FormReducer } from 'redux-form';
import { localizeReducer as localize } from 'react-localize-redux';

import authentication from './authentication';
import FinancialForecastReducer from 'scenes/FinancialForecast/state/FinancialForecastReducer';

const rootReducer = combineReducers({
	form: FormReducer,
	localize,
	authentication,
	financialForecast: FinancialForecastReducer
});

export default rootReducer;
