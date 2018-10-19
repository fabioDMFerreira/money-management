import React from 'react';
import { number } from 'prop-types';
import { NavLink, Badge } from 'reactstrap';
import { NavLink as RRNavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const ShoppingCartMenuOption = ({ numberOfItems }) => (
	<NavLink tag={RRNavLink} to="/shopping-cart">
		<FontAwesomeIcon icon={faShoppingCart} />{' '}
		{numberOfItems >= 0 && <Badge color="secondary">{numberOfItems}</Badge>}
	</NavLink>
);

ShoppingCartMenuOption.propTypes = {
	numberOfItems: number,
};

ShoppingCartMenuOption.defaultProps = {
	numberOfItems: 0,
};

export default ShoppingCartMenuOption;
