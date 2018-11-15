import React from 'react';
import { Navbar, Container } from 'reactstrap';
import { bool } from 'prop-types';
import { connect } from 'react-redux';

import Authentication from '../../scenes/Authentication';

import Header from '../Header';
import NavbarComponent from '../Navbar';
import Main from '../Main';

import './App.css';
import LanguagesToggle from '../LanguagesToggle';

const App = ({ isLoggedIn }) => (
	<div id="root">
		{
			isLoggedIn &&
			<React.Fragment>
				<div id="languages-container">
					<LanguagesToggle />
				</div>
				<Navbar id="navbar" color="primary" dark expand="md">
					<Container>
						<Header />
						<NavbarComponent />
					</Container>
				</Navbar>
				<Container>
					<Main />
				</Container>
			</React.Fragment>
		}
		{
			!isLoggedIn &&
			<Authentication />
		}

	</div>
);

App.propTypes = {
	isLoggedIn: bool
};

const mapStateToProps = state => {

	const { isLoggedIn } = state.authentication;

	return {
		isLoggedIn
	}
}

export default connect(mapStateToProps)(App);
