import React from 'react';
import { Navbar, Container } from 'reactstrap';

// import Authentication from '../../scenes/Authentication';

import Header from '../Header';
import NavbarComponent from '../Navbar';
import Main from '../Main';
import FinancialForecastNavbar from 'scenes/FinancialForecast/Navbar';

import './App.css';
import GlobalFilters from 'scenes/FinancialForecast/containers/GlobalFilters';
import Card from 'reactstrap/lib/Card';
import CardBody from 'reactstrap/lib/CardBody';
import NumberTransactionsFiltered from 'scenes/FinancialForecast/containers/NumberTransactionsFiltered';
// import LanguagesToggle from '../LanguagesToggle';

const App = () => (
	<div id="root">
		{
			<React.Fragment>
				{/* <div id="languages-container">
					<LanguagesToggle />
				</div> */}
				<Navbar id="navbar" color="primary" dark expand="md">
					<Container fluid>
						<Header />
						<NavbarComponent />
					</Container>
				</Navbar>
				<Container fluid>
					<Card style={{ marginTop: '20px' }}>
						<CardBody>
							<GlobalFilters />
						</CardBody>
					</Card>
					<div style={{ marginTop: '20px' }}>
						<FinancialForecastNavbar />
						<NumberTransactionsFiltered />
					</div>
					<Main />
				</Container>
			</React.Fragment>
		}
		{
			// !isLoggedIn &&
			// <Authentication />
		}

	</div>
);

export default App;
