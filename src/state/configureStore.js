

import { applyMiddleware, compose, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import { persistStore } from 'redux-pouchdb';
import promiseMiddleware from 'redux-promise-middleware';
import thunkMiddleware from 'redux-thunk';

import configureRootReducer from './configureRootReducer';
import initilizeLocalize from './localize';
import applyRulesMiddleware from './middlewares/applyRulesMiddleware';
import generateRandomSeedMiddleware from './middlewares/generateRandomSeedMiddleware';
import generateRecurringTransactionsEstimatesMiddleware from './middlewares/generateRecurringTransactionsEstimatesMiddleware';

export default (pouchdb) => {
  const loggerMiddleware = createLogger({ collapsed: true });

  const composeEnhancers = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    })
    : compose;

  const store = createStore(
    configureRootReducer(pouchdb),
    composeEnhancers(applyMiddleware(
      thunkMiddleware,
      promiseMiddleware(),
      generateRecurringTransactionsEstimatesMiddleware,
      generateRandomSeedMiddleware,
      applyRulesMiddleware,
      loggerMiddleware,
    )),
  );

  persistStore(store);

  initilizeLocalize(store.dispatch, store.getState());

  return store;
};
