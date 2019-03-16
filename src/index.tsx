import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { LocalizeProvider } from 'react-localize-redux';
import 'react-dates/initialize';

import registerServiceWorker from './registerServiceWorker';

import store from './store';
import App from './components';

import 'rc-slider/assets/index.css';
import 'react-dates/lib/css/_datepicker.css';

import './shared.css';

ReactDOM.render(
		<Provider store={store}>
			<LocalizeProvider store={store}>
				<Router>
					<App />
				</Router>
			</LocalizeProvider>
		</Provider >
	, document.getElementById('root'),
);
registerServiceWorker();
