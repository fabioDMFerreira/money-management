import React from 'react';
import { bool } from 'prop-types';
import { match } from 'react-router-prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CustomerProfile from './CustomerProfile';

const CustomerProfileContainer = ({ isLoggedIn, match }) => {
	if (isLoggedIn) {
		return <CustomerProfile match={match} />;
	}

	if (process.env.NODE_ENV === 'development') {
		console.log('Not authorized to access /profile');
	}

	return <Redirect to="/authentication" />;
};

CustomerProfileContainer.propTypes = {
	isLoggedIn: bool,
	match: match.isRequired,
};

CustomerProfileContainer.defaultProps = {
	isLoggedIn: false,
};

function mapStateToProps(state) {
	const { authentication: { isLoggedIn } } = state;

	return {
		isLoggedIn,
	};
}

export default connect(mapStateToProps)(CustomerProfileContainer);
