import React from 'react';
import Container from 'reactstrap/lib/Container';
import Card from 'reactstrap/lib/Card';
import CardBody from 'reactstrap/lib/CardBody';

import FinancialForecastNavbar from 'views/pages/FinancialForecast/Navbar';
import GlobalFilters from 'views/pages/FinancialForecast/containers/GlobalFilters';
import NumberTransactionsFiltered from 'views/pages/FinancialForecast/containers/NumberTransactionsFiltered';

export default (Component: React.FC) => () => (
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
    <Component />
  </Container>
)
