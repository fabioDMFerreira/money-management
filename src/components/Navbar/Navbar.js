import React from 'react';
import { bool } from 'prop-types';
import { Nav, NavItem, NavLink } from 'reactstrap';
import { NavLink as RRNavLink } from 'react-router-dom';

import {
	HOME,
	RENT,
	AUTHENTICATION,
	PROFILE,

} from 'locale/consts';

import Translate from '../Translate';
import ShoppingCartMenuOption from '../ShoppingCartMenuOption';


import './Navbar.css';
import Logout from '../Logout';
import LanguagesToggle from '../LanguagesToggle';

const Navbar = ({ isLoggedIn }) => (
	<Nav className="ml-auto" navbar vertical={false}>
		<NavItem><NavLink tag={RRNavLink} exact to="/"><Translate id={HOME} /></NavLink></NavItem>
		<NavItem><NavLink tag={RRNavLink} to="/rent"><Translate id={RENT} /></NavLink></NavItem>
		{!isLoggedIn && <NavItem><NavLink tag={RRNavLink} to="/authentication"><Translate id={AUTHENTICATION} /></NavLink></NavItem>}
		{isLoggedIn && <NavItem><NavLink tag={RRNavLink} to="/profile"><Translate id={PROFILE} /></NavLink></NavItem>}
		{isLoggedIn && <NavItem><Logout /></NavItem>}
		<NavItem><ShoppingCartMenuOption /></NavItem>
		<NavItem><LanguagesToggle /></NavItem>
	</Nav>
);

Navbar.propTypes = {
	isLoggedIn: bool,
};

Navbar.defaultProps = {
	isLoggedIn: false,
};

export default Navbar;
