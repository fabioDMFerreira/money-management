import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

import OAuth from '../OAuth';

export default OAuth(
	'google',
	props => <button {...props} className="btn btn-danger"><FontAwesomeIcon icon={faGoogle} /> Login with Google+</button>,
);
