import React from 'react';
import { Navbar, Container } from 'reactstrap';
import { BrowserRouter as Router } from 'react-router-dom';

import Header from '../Header';
import NavbarComponent from '../Navbar';
import Main from '../Main';

import './App.css';
import Card from 'reactstrap/lib/Card';
import CardBody from 'reactstrap/lib/CardBody';

import FinancialForecastNavbar from 'views/pages/FinancialForecast/Navbar';
import GlobalFilters from 'views/pages/FinancialForecast/containers/GlobalFilters';
import NumberTransactionsFiltered from 'views/pages/FinancialForecast/containers/NumberTransactionsFiltered';

const App = () => (
	<Router>
		<div id="root">
			{
				<React.Fragment>
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
		</div>
	</Router>
);

export default App;
