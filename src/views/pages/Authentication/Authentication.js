import React from 'react';
import { bool } from 'prop-types';
import Cookies from 'js-cookie';

import { LOGIN } from 'locale/consts';
import Translate from 'components/Translate';

import LoginForm from 'components/LoginForm';
import Logout from 'components/Logout';

import './Authentication.css';

const Authentication = ({ isLoggedIn }) =>{
	return (
		<div id="authentication" className="text-center">
			<div className="container">
				{
					(
						() => {
							if (!isLoggedIn) {
								return (
									<React.Fragment>
										<h2><Translate id={LOGIN} /></h2>
										<LoginForm />
										{/* <hr />
										<FacebookLogin />
										<GoogleLogin /> */}
									</React.Fragment>);
							}

							return <div>ALREADY_AUTHENTICATED <Logout /></div>;
						}
					)()
				}
			</div>
		</div>
	);
}



Authentication.propTypes = {
	isLoggedIn: bool,
};

Authentication.defaultProps = {
	isLoggedIn: false,
};

export default Authentication;
