

import { applyMiddleware, compose, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import { persistReducer, persistStore } from 'redux-persist';
import immutableTransform from 'redux-persist-transform-immutable';
import storage from 'redux-persist/lib/storage';
import promiseMiddleware from 'redux-promise-middleware';
import thunkMiddleware from 'redux-thunk';

import initilizeLocalize from './localize';
import applyRulesMiddleware from './middlewares/applyRulesMiddleware';
import generateRandomSeedMiddleware from './middlewares/generateRandomSeedMiddleware';
import generateRecurringTransactionsEstimatesMiddleware from './middlewares/generateRecurringTransactionsEstimatesMiddleware';
import rootReducer from './rootReducer';


const persistConfig = {
  key: 'state',
  storage,
  transforms: [
    immutableTransform({
      whitelist: ['financialForecast', 'wallets', 'tags', 'rules', 'budgets', 'contracts'],
    }),
  ],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const loggerMiddleware = createLogger({ collapsed: true });

const composeEnhancers = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
  })
  : compose;

const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(
    thunkMiddleware,
    promiseMiddleware(),
    generateRecurringTransactionsEstimatesMiddleware,
    generateRandomSeedMiddleware,
    applyRulesMiddleware,
    loggerMiddleware,
  )),
);

const persistor = persistStore(store);

initilizeLocalize(store.dispatch, store.getState());

export { persistor };

export default store;
