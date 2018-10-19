import React from 'react';
import { bool } from 'prop-types';

import { AUTHENTICATION } from 'locale/consts';
import Translate from 'components/Translate';

import LoginForm from 'components/LoginForm';
import Logout from 'components/Logout';

const Authentication = ({ isLoggedIn }) => (
	<div>
		<h1><Translate id={AUTHENTICATION} /></h1>
		{
			(
				() => {
					if (!isLoggedIn) {
						return <LoginForm />;
					}

					return <div>ALREADY_AUTHENTICATED <Logout /></div>;
				}
			)()
		}
	</div>
);

Authentication.propTypes = {
	isLoggedIn: bool,
};

Authentication.defaultProps = {
	isLoggedIn: false,
};

export default Authentication;
