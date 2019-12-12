import 'react-dates/initialize';
import './shared.css';

import React from 'react';
import { render } from 'react-dom';
import { LocalizeProvider } from 'react-localize-redux';
import { Provider } from 'react-redux';

import registerServiceWorker from './registerServiceWorker';
import store from './state';
import App from './views/layout/App';

render(
  <Provider store={store}>
    <LocalizeProvider store={store}>
      <App />
    </LocalizeProvider>
  </Provider >
  , document.getElementById('root'),
);
registerServiceWorker();
