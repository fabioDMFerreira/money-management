import { createStore, applyMiddleware, compose } from 'redux';
import { persistReducer, persistStore, REHYDRATE } from 'redux-persist';
import immutableTransform from 'redux-persist-transform-immutable';
import storage from 'redux-persist/lib/storage';
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import { createLogger } from 'redux-logger';

import rootReducer from './rootReducer';
import InitLocalization from './localize';
import { List } from 'immutable';
import Transaction from 'scenes/FinancialForecast/Balance/Transaction.class';

const persistConfig = {
	key: 'state',
	storage,
	transforms: [immutableTransform({
		whitelist: ['financialForecast']
	})]
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
	loggerMiddleware,
	({ dispatch, getState }) => next => action => {
		if (action.type === REHYDRATE && action.payload && action.payload.financialForecast && List.isList(action.payload.financialForecast.transactions)) {
			action.payload.financialForecast.transactions = action.payload.financialForecast.transactions.map(transaction => Transaction.buildFromRawTransaction(transaction));
		}

		next(action);
	}
)));

const persistor = persistStore(store);


InitLocalization(store.dispatch, store.getState());

export { persistor };

export default store;
