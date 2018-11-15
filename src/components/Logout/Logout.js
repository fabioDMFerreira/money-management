import React from 'react';
import { func } from 'prop-types';
import { DropdownItem } from 'reactstrap';

import { LOGOUT } from '../../locale/consts';

import Translate from '../Translate';

const Logout = ({ logout }) => (
	<DropdownItem onClick={logout}>
		<Translate id={LOGOUT} />
	</DropdownItem>
);

Logout.propTypes = {
	logout: func.isRequired,
};

export default Logout;
