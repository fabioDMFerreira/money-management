import {
  ADD,
  BALANCE,
  ESTIMATES,
  LAST_TRANSACTIONS,
  LOAD_DATA_SAMPLE,
  LOAD_DATA_SAMPLE_CONFIRMATION_MESSAGE,
  MORE,
  NO_TRANSACTIONS_FOUND,
  NO_WALLETS_FOUND,
  QUICK_ACTIONS,
  START_GUIDE_TOUR,
  TAGS,
  TRANSACTIONS,
  WALLETS,
} from 'locale/consts';
import React, { useState } from 'react';
import { NavLink as RRNavLink, withRouter } from 'react-router-dom';
import Button from 'reactstrap/lib/Button';
import Card from 'reactstrap/lib/Card';
import CardBody from 'reactstrap/lib/CardBody';
import CardText from 'reactstrap/lib/CardText';
import CardTitle from 'reactstrap/lib/CardTitle';
import Col from 'reactstrap/lib/Col';
import ListGroup from 'reactstrap/lib/ListGroup';
import ListGroupItem from 'reactstrap/lib/ListGroupItem';
import Nav from 'reactstrap/lib/Nav';
import NavItem from 'reactstrap/lib/NavItem';
import NavLink from 'reactstrap/lib/NavLink';
import Row from 'reactstrap/lib/Row';
import ButtonWithConfirmation from 'views/components/ButtonWithConfirmation';
import Onboarding from 'views/components/Onboarding';
import Translate from 'views/components/Translate';
import GuideTour from 'views/containers/GuideTour';

import Tags from '../Tags/Tags';
import Timeline from '../Transactions/Timeline/Timeline';
import { DashboardProps } from './DashboardProps';
import dashboardTourGuideSteps from './dashboardTourGuideSteps';


const TagsEnhanced = withRouter(Tags);

export default (props: DashboardProps) => {
  const [guideTourStarted, setGuideTourStarted] = useState(false);

  return (
    <Row>
      <GuideTour
        steps={dashboardTourGuideSteps}
        started={guideTourStarted}
        onClose={() => setGuideTourStarted(false)}
      />
      <Col xs={10}>
        <Row id="statistics" className="mb-3">
          <Col xs={3}>
            <Card>
              <CardBody>
                <CardTitle><Translate id={BALANCE} /></CardTitle>
                <CardText><h2>{props.totalBalance}</h2></CardText>
              </CardBody>
            </Card>
          </Col>
          <Col xs={3}>
            <RRNavLink to="/wallets" className="no-link-styles">
              <Card>
                <CardBody>
                  <CardTitle><Translate id={WALLETS} /></CardTitle>
                  <CardText><h2>{props.totalWallets}</h2></CardText>
                </CardBody>
              </Card>
            </RRNavLink>
          </Col>
          <Col xs={3}>
            <RRNavLink to="/transactions" className="no-link-styles">
              <Card>
                <CardBody>
                  <CardTitle><Translate id={TRANSACTIONS} /></CardTitle>
                  <CardText><h2>{props.totalTransactions}</h2></CardText>
                </CardBody>
              </Card>
            </RRNavLink>
          </Col>
          <Col xs={3}>
            <RRNavLink to="/estimates" className="no-link-styles">
              <Card>
                <CardBody>
                  <CardTitle><Translate id={ESTIMATES} /></CardTitle>
                  <CardText><h2>{props.totalEstimates}</h2></CardText>
                </CardBody>
              </Card>
            </RRNavLink>
          </Col>
        </Row>
        <Row className="mb-3" >
          <Col xs={6}>
            <Onboarding
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
                  <CardTitle><h4><Translate id={WALLETS} /></h4></CardTitle>
                  {
                    props.wallets ?
                      <ListGroup>
                        {
                          props.wallets.map(wallet =>
                            (
                              <ListGroupItem>
                                <RRNavLink to={`/wallets/${wallet.id}`}>
                                  {wallet.name}
                                </RRNavLink>
                                <span style={{ float: 'right', color: 'green' }}>
                                  {`+${wallet.balance}`}
                                </span>
                              </ListGroupItem>
                            ))
                        }
                      </ListGroup>
                      :
                      <Translate id={NO_WALLETS_FOUND} />
                  }
                  <NavLink tag={RRNavLink} exact to="/wallets"><Translate id={`${ADD} ${MORE} ${WALLETS}`} /></NavLink>
                </CardBody>
              </Card>
            </Col>
          }
          {
            props.allTransactions && props.allTransactions.length > 0 &&
            <Col xs={6} className="mb-3">
              <Card>
                <CardBody style={{ minHeight: 348 }}>
                  <CardTitle><h4><Translate id={LAST_TRANSACTIONS} /></h4></CardTitle>
                  {
                    props.lastTransactions ?
                      <ListGroup>
                        {
                          props.lastTransactions.map(transaction =>
                            (
                              <ListGroupItem>
                                {transaction.description}
                                <small className="ml-2">{transaction.startDate}</small>
                                <span style={{ float: 'right' }}>
                                  {(transaction.credit && +transaction.credit > 0) ?
                                    <span style={{ color: 'green' }}>
                                      {`+${transaction.credit}`}
                                    </span> :
                                    <span style={{ color: 'red' }}>
                                      {`-${transaction.debit}`}
                                    </span>
                                  }
                                </span>
                              </ListGroupItem>
                            ))
                        }
                      </ListGroup>
                      :
                      <Translate id={NO_TRANSACTIONS_FOUND} />
                  }
                  <NavLink tag={RRNavLink} exact to="/transactions"><Translate id={MORE} /> <Translate id={TRANSACTIONS} /></NavLink>
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
      <Col xs={2} >
        <h4><Translate id={QUICK_ACTIONS} /></h4>
        <Nav vertical id="quick-actions">
          <NavItem className="mt-2">
            <Button
              id="guide-tour-button"
              block
              color="info"
              onClick={() => setGuideTourStarted(true)}
            >
              <Translate id={START_GUIDE_TOUR} />
            </Button>
          </NavItem>
          <NavItem className="mt-3">
            <div id="load-data-sample">
              <ButtonWithConfirmation
                block
                color="warning"
                confirmationMessage={<Translate id={LOAD_DATA_SAMPLE_CONFIRMATION_MESSAGE} />}
                onClick={props.loadSampleData}
              >
                <Translate id={LOAD_DATA_SAMPLE} />
              </ButtonWithConfirmation>
            </div>
          </NavItem>
          <NavLink className="mt-3" tag={RRNavLink} exact to="/wallets">
            <Translate id={ADD} /> <Translate id={WALLETS} />
          </NavLink>
          <NavLink tag={RRNavLink} exact to="/tags">
            <Translate id={ADD} /> <Translate id={TAGS} />
          </NavLink>
          <NavLink tag={RRNavLink} exact to="/transactions">
            <Translate id={ADD} /> <Translate id={TRANSACTIONS} />
          </NavLink>
          <NavLink tag={RRNavLink} exact to="/estimates">
            <Translate id={ADD} /> <Translate id={ESTIMATES} />
          </NavLink>
        </Nav>
      </Col>
    </Row >
  );
};
