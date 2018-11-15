import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import { createLogger } from 'redux-logger';
import rootReducer from './rootReducer';
import InitLocalization from './localize';

const persistConfig = {
		key: 'state',
		storage,
	},
	persistedReducer = persistReducer(persistConfig, rootReducer),
	loggerMiddleware = createLogger(),
	store = createStore(persistedReducer, applyMiddleware(
		thunkMiddleware,
		promiseMiddleware(),
		loggerMiddleware,
	)),
	persistor = persistStore(store);

InitLocalization(store.dispatch, store.getState());

export { persistor };

export default store;
