import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBillWave } from '@fortawesome/free-solid-svg-icons';
import { NavbarBrand } from 'reactstrap';

import './Header.css';

export default () => (
	<NavbarBrand>
		<FontAwesomeIcon icon={faMoneyBillWave} /> Financial forecast
	</NavbarBrand>
);
