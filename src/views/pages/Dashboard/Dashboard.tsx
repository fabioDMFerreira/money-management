import React from 'react';

import Row from 'reactstrap/lib/Row';
import Col from 'reactstrap/lib/Col';

import DashboardProps from './DashboardProps';

export default (props: DashboardProps) => (
  <div>
    <h2>Dashboard</h2>
    <hr />
    <Row>
      <Col xs={2}>
        <label>Total Balance: </label>{props.totalBalance}
      </Col>
      <Col xs={2}>
        <label>Transactions: </label>{props.totalTransactions}
      </Col>
      <Col xs={2}>
        <label>Tags: </label>{props.totalTags}
      </Col>
    </Row>
  </div>
)
