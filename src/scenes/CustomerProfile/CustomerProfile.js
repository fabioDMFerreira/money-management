import React from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import { match } from 'react-router-prop-types';

import UserDetails from './UserDetails';
import Favorites from './Favorites';

import './CustomerProfile.css';
import MyOrders from './MyOrders';
import RentalHistory from './RentalHistory';
import Events from './Events';

const CustomerProfile = ({ match: { path } }) =>
	(
		<div id="customer-profile">
			<h1>Profile</h1>
			<nav>
				<ul>
					<li><Link to={`${path}`} >User Details</Link></li>
					<li><Link to={`${path}/my-orders`}>My orders</Link></li>
					<li><Link to={`${path}/favorites`} >Favorites</Link></li>
					<li><Link to={`${path}/rental-history`}>Rental History</Link></li>
					<li><Link to={`${path}/events`}>Events</Link></li>
				</ul>
			</nav>
			<div>
				<Switch>
					<Route exact path={`${path}`} component={UserDetails} />
					<Route exact path={`${path}/my-orders`} component={MyOrders} />
					<Route exact path={`${path}/favorites`} component={Favorites} />
					<Route exact path={`${path}/rental-history`} component={RentalHistory} />
					<Route exact path={`${path}/events`} component={Events} />
				</Switch>
			</div>
		</div >
	);

CustomerProfile.propTypes = {
	match: match.isRequired,
};

export default CustomerProfile;
