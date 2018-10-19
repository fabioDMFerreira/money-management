import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from 'scenes/Home';
import CustomerProfile from 'scenes/CustomerProfile';
import Rent from 'scenes/Rent';
import ShoppingCart from 'scenes/ShoppingCart';
import Checkout from 'scenes/Checkout';
import Authentication from 'scenes/Authentication';
import NotFound from 'scenes/NotFound';

import './Main.css';

export default () => (
	<div id="main">
		<Switch>
			<Route exact path="/" component={Home} />
			<Route path="/profile" component={CustomerProfile} />
			<Route path="/rent" component={Rent} />
			<Route path="/shopping-cart" component={ShoppingCart} />
			<Route path="/checkout" component={Checkout} />
			<Route path="/authentication" component={Authentication} />
			<Route path="*" component={NotFound} />
		</Switch>
	</div>
);
