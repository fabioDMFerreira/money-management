import React from 'react';
import { LocalizeProvider } from 'react-localize-redux';
import { Provider } from 'react-redux';
import configureStore from 'state';
import App from 'views/layout/App';
import { useBackend } from 'views/providers/backend.provider';

export default () => {
  const { pouchdb } = useBackend();

  const store = configureStore(pouchdb);

  return (
    <Provider store={store}>
      <LocalizeProvider store={store}>
        <App />
      </LocalizeProvider>
    </Provider >
  );
};
