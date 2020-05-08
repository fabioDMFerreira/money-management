import React from 'react';
import Container from 'reactstrap/lib/Container';
import GlobalFiltersContainer from 'views/containers/GlobalFilters';
import FinancialForecastNavbar from 'views/pages/Transactions/Navbar';

export default (Component: React.FC<any>) => () => (
  <Container fluid>
    <GlobalFiltersContainer />
    <div className="mt-4">
      <FinancialForecastNavbar />
    </div>
    <div className="mt-2">
      <Component />
    </div>
  </Container>
);
