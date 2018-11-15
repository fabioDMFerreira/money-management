import { combineReducers } from 'redux';
import { reducer as FormReducer } from 'redux-form';
import { localizeReducer as localize } from 'react-localize-redux';

import authentication from './authentication';

const rootReducer = combineReducers({
	form: FormReducer,
	localize,
	authentication,
});

export default rootReducer;
