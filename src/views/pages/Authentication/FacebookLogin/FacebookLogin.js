import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';

import OAuth from '../OAuth';

export default OAuth(
	'facebook',
	props => <button {...props} className="btn btn-primary"><FontAwesomeIcon icon={faFacebook} /> Login with Facebook</button>,
);
