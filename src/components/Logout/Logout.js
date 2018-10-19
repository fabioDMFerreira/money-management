import React from 'react';
import { func } from 'prop-types';
import { Button } from 'reactstrap';

const Logout = ({ logout }) => (
	<Button color="link" onClick={logout}>LOGOUT</Button>
);

Logout.propTypes = {
	logout: func.isRequired,
};

export default Logout;
