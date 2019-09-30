import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { LocalizeProvider } from 'react-localize-redux';
import 'react-dates/initialize';

import registerServiceWorker from './registerServiceWorker';

import store from './state';
import App from './views/layout/App';

import './shared.css';

ReactDOM.render(
	<Provider store={store}>
		<LocalizeProvider store={store}>
			<App />
		</LocalizeProvider>
	</Provider >
	, document.getElementById('root'),
);
registerServiceWorker();
