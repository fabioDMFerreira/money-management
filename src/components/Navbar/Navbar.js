import React from 'react';
import { bool } from 'prop-types';
import { Nav, NavItem, NavLink, UncontrolledDropdown, DropdownMenu, DropdownToggle } from 'reactstrap';
import { NavLink as RRNavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';

import {
	HOME,
	AUTHENTICATION,
} from 'locale/consts';

import Translate from '../Translate';


import './Navbar.css';
import Logout from '../Logout';

const Navbar = ({ isLoggedIn }) => (
	<Nav className="ml-auto" navbar vertical={false}>
		<NavItem>
			<NavLink tag={RRNavLink} exact to="/">
				<Translate id={HOME} />
			</NavLink>
		</NavItem>
		{
			!isLoggedIn &&
			<NavItem>
				<NavLink tag={RRNavLink} to="/authentication">
					<Translate id={AUTHENTICATION} />
				</NavLink>
			</NavItem>
		}
		{
			isLoggedIn &&
			<UncontrolledDropdown nav inNavbar>
				<DropdownToggle nav caret>
					<FontAwesomeIcon icon={faCog} />
				</DropdownToggle>
				<DropdownMenu right>
					<Logout />
				</DropdownMenu>
			</UncontrolledDropdown>
		}
	</Nav>
);

Navbar.propTypes = {
	isLoggedIn: bool,
};

Navbar.defaultProps = {
	isLoggedIn: false,
};

export default Navbar;
