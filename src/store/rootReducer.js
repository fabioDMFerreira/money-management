import { combineReducers } from 'redux';
import { reducer as FormReducer } from 'redux-form';
import { localizeReducer as localize } from 'react-localize-redux';

import authentication from './authentication';
import shoppingCart from './shoppingCart';
import rent from './rent';

const rootReducer = combineReducers({
	form: FormReducer,
	localize,
	authentication,
	rent,
	shoppingCart,
});

export default rootReducer;
