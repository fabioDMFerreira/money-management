import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { bool } from 'prop-types';
import { connect } from 'react-redux';

import Home from 'scenes/Home';
import Authentication from 'scenes/Authentication';
import NotFound from 'scenes/NotFound';

import './Main.css';
import FinancialForecast from '../../scenes/FinancialForecast';

const Main = ({ isLoggedIn }) => (
	<div id="main">
		<Switch>
			{
				// isLoggedIn &&
				<React.Fragment>
					{/* <Route path="" exact component={Home} /> */}
					<Route path="/" component={FinancialForecast} />
					<Route path="/not-found" component={NotFound} />
				</React.Fragment>
			}
			{/* <Ro	ute path="/login" component={Authentication} /> */}
		</Switch>
	</div>
);

Main.propTypes = {
	isLoggedIn: bool
};

const mapStateToProps = state => {

	const { isLoggedIn } = state.authentication;

	return {
		isLoggedIn
	}
}

export default connect(mapStateToProps)(Main);
