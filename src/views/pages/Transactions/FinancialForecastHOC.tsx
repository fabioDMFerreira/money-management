import React from 'react';
import Container from 'reactstrap/lib/Container';

import FinancialForecastNavbar from 'views/pages/Transactions/Navbar';
import GlobalFilters from 'views/pages/Transactions/containers/GlobalFilters';

export default (Component: React.FC) => () => (
	<Container fluid>
		<GlobalFilters />
		<div className="mt-4">
			<FinancialForecastNavbar />
		</div>
		<div className="mt-2">
			<Component />
		</div>
	</Container>
);
