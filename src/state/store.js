import { createStore, applyMiddleware, compose } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import immutableTransform from 'redux-persist-transform-immutable';
import storage from 'redux-persist/lib/storage';
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import { createLogger } from 'redux-logger';

import rootReducer from './rootReducer';
import initilizeLocalize from './localize';
import generateRandomSeedMiddleware from './middlewares/generateRandomSeedMiddleware';

const persistConfig = {
	key: 'state',
	storage,
	transforms: [immutableTransform({
		whitelist: ['financialForecast', 'wallets', 'tags'],
	})],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const loggerMiddleware = createLogger({ collapsed: true });

const composeEnhancers =
	typeof window === 'object' &&
		window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
		window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
			// Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
		}) : compose;

const store = createStore(persistedReducer, composeEnhancers(applyMiddleware(
	thunkMiddleware,
	promiseMiddleware(),
	generateRandomSeedMiddleware,
	loggerMiddleware,
)));

const persistor = persistStore(store);


initilizeLocalize(store.dispatch, store.getState());

export { persistor };

export default store;
