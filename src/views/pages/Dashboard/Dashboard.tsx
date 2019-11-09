import React from 'react';

import Row from 'reactstrap/lib/Row';
import Col from 'reactstrap/lib/Col';

import DashboardProps from './DashboardProps';
import Card from 'reactstrap/lib/Card';
import CardBody from 'reactstrap/lib/CardBody';
import CardTitle from 'reactstrap/lib/CardTitle';
import CardText from 'reactstrap/lib/CardText';
import Timeline from '../FinancialForecast/Timeline/Timeline';
import Nav from 'reactstrap/lib/Nav';
import { NavLink as RRNavLink, withRouter } from 'react-router-dom';
import NavLink from 'reactstrap/lib/NavLink';
import ListGroup from 'reactstrap/lib/ListGroup';
import ListGroupItem from 'reactstrap/lib/ListGroupItem';
import Tags from '../Tags/Tags';
import Onboarding from 'views/components/Onboarding';
import { generateRandomData } from 'models/Seed/generateRandomData';
import ButtonWithConfirmation from 'views/components/ButtonWithConfirmation';
import NavItem from 'reactstrap/lib/NavItem';

const TagsEnhanced = withRouter(Tags);

export default (props: DashboardProps) => (
  <Row>
    <Col xs={10}>
      <Row className="mb-3">
        <Col xs={3}>
          <Card>
            <CardBody>
              <CardTitle>Balance</CardTitle>
              <CardText><h2>{props.totalBalance}</h2></CardText>
            </CardBody>
          </Card>
        </Col>
        <Col xs={3}>
          <RRNavLink to="/wallets" className="no-link-styles">
            <Card>
              <CardBody>
                <CardTitle>Wallets</CardTitle>
                <CardText><h2>{props.totalWallets}</h2></CardText>
              </CardBody>
            </Card>
          </RRNavLink>
        </Col>
        <Col xs={3}>
          <RRNavLink to="/transactions" className="no-link-styles">
            <Card>
              <CardBody>
                <CardTitle>Transactions</CardTitle>
                <CardText><h2>{props.totalTransactions}</h2></CardText>
              </CardBody>
            </Card>
          </RRNavLink>
        </Col>
        <Col xs={3}>
          <RRNavLink to="/estimates" className="no-link-styles">
            <Card>
              <CardBody>
                <CardTitle>Estimates</CardTitle>
                <CardText><h2>{props.totalEstimates}</h2></CardText>
              </CardBody>
            </Card>
          </RRNavLink>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col xs={6}>
          <Onboarding
            estimates={props.estimatesAllTransactions}
            transactions={props.allTransactions}
            tags={props.tags}
            wallets={props.wallets}
          />
        </Col>
      </Row>
      {
        props.wallets && props.wallets.length > 0 &&
        props.allTransactions && props.allTransactions.length > 0 &&
        <Row className="mb-3">
          <Col xs={12}>
            <Card>
              <CardBody>
                <Timeline balance={props.balance} transactions={props.allTransactions} hideControls />
              </CardBody>
            </Card>
          </Col>
        </Row>
      }
      <Row>
        {
          props.wallets && props.wallets.length > 0 &&
          <Col xs={6}>
            <Card>
              <CardBody style={{ minHeight: 348 }}>
                <CardTitle><h4>Wallets</h4></CardTitle>
                {
                  props.wallets ?
                    <ListGroup>
                      {
                        props.wallets.map(wallet =>
                          <ListGroupItem>
                            <RRNavLink to={'/wallets/' + wallet.id}>
                              {wallet.name}
                            </RRNavLink>
                            <span style={{ float: 'right', color: 'green' }}>
                              {'+' + wallet.balance}
                            </span>
                          </ListGroupItem>)
                      }
                    </ListGroup>
                    :
                    "No wallets found"
                }
                <NavLink tag={RRNavLink} exact to="/wallets">Add more wallets</NavLink>
              </CardBody>
            </Card>
          </Col>
        }
        {
          props.allTransactions && props.allTransactions.length > 0 &&
          <Col xs={6} className="mb-3">
            <Card>
              <CardBody style={{ minHeight: 348 }}>
                <CardTitle><h4>Last transactions</h4></CardTitle>
                {
                  props.lastTransactions ?
                    <ListGroup>
                      {
                        props.lastTransactions.map(transaction =>
                          <ListGroupItem>
                            {transaction.description}
                            <small className="ml-2">{transaction.startDate}</small>
                            <span style={{ float: 'right' }}>
                              {(transaction.credit && +transaction.credit > 0) ?
                                <span style={{ color: 'green' }}>
                                  {'+' + transaction.credit}
                                </span> :
                                <span style={{ color: 'red' }}>
                                  {'-' + transaction.debit}
                                </span>
                              }
                            </span>
                          </ListGroupItem>)
                      }
                    </ListGroup>
                    :
                    "No transactions found"
                }
                <NavLink tag={RRNavLink} exact to="/transactions">More Transactions</NavLink>
              </CardBody>
            </Card>
          </Col>
        }
      </Row>
      {
        props.tags && props.tags.length > 0 && props.allTransactions && props.allTransactions.length > 0 &&
        <Row className="mb-3">
          <Col xs={12}>
            <Card>
              <CardBody>
                <TagsEnhanced transactions={props.allTransactions} tags={props.tags} hideControls />
              </CardBody>
            </Card>
          </Col>
        </Row>
      }
    </Col>
    {
      // props.wallets && props.wallets.length > 0 &&
      // props.tags && props.tags.length > 0 &&
      // props.allTransactions && props.allTransactions.length > 0 &&
      // props.estimatesAllTransactions && props.estimatesAllTransactions.length > 0 &&
      <Col xs={2}>
        <h4>Quick actions</h4>
        <Nav vertical>
          <NavLink tag={RRNavLink} exact to="/wallets">
            Add wallets
        </NavLink>
          <NavLink tag={RRNavLink} exact to="/tags">
            Add tags
        </NavLink>
          <NavLink tag={RRNavLink} exact to="/transactions">
            Add transactions
        </NavLink>
          <NavLink tag={RRNavLink} exact to="/estimates">
            Add estimates
        </NavLink>
          <NavItem>
            <ButtonWithConfirmation
              confirmationMessage="All your current transactions will be deleted."
              onClick={props.loadSampleData}
            >
              Load transactions sample
              </ButtonWithConfirmation>
          </NavItem>
        </Nav>
      </Col>
    }
  </Row >
)
