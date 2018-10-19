import React from 'react';
import { Button } from 'reactstrap';
import { NavLink } from 'react-router-dom';

import { SHOPPING_CART, CHECKOUT } from 'locale/consts';
import Translate from 'components/Translate';

import ShoppingCartProductsList from './components/ShoppingCartProductsList';

export default () => (
	<div>
		<h1><Translate id={SHOPPING_CART} /></h1>
		<div id="checkout-container" className="text-right">
			<NavLink to="/checkout"><Button><Translate id={CHECKOUT} /></Button></NavLink>
		</div>
		<ShoppingCartProductsList />
	</div>
);
