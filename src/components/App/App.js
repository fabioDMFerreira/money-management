import React from 'react';
import { Navbar, Container } from 'reactstrap';

import Header from '../Header';
import NavbarComponent from '../Navbar';
import Main from '../Main';

import './App.css';

export default () => (
	<div id="root">
		<Navbar color="light" light expand="md">
			<Container>
				<Header />
				<NavbarComponent />
			</Container>
		</Navbar>
		<Container>
			<Main />
		</Container>
	</div>
);
