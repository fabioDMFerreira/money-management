import React from 'react';
import { connect } from 'react-redux';
import { bool } from 'prop-types';
import { Redirect } from 'react-router-dom';

import Authentication from './Authentication';

const AuthenticationContainer = ({ isLoggedIn }) => {
	if (isLoggedIn) {
		if (process.env.NODE_ENV === 'development') {
			console.log('Can\'t access to /authentication because you are logged in');
		}
		return <Redirect to="/" />;
	}

	return <Authentication isLoggedIn={isLoggedIn} />;
};

AuthenticationContainer.propTypes = {
	isLoggedIn: bool,
};

AuthenticationContainer.defaultProps = {
	isLoggedIn: false,
};

function mapStateToProps(state) {
	const { authentication: { isLoggedIn } } = state;

	return {
		isLoggedIn,
	};
}

export default connect(mapStateToProps)(AuthenticationContainer);
