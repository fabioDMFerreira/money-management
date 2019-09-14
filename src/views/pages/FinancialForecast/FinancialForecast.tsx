import React, { Component } from 'react';
import { connect } from 'react-redux';
import Row from 'reactstrap/lib/Row';
import Col from 'reactstrap/lib/Col';
import classnames from 'classnames';
import Card from 'reactstrap/lib/Card';
import CardBody from 'reactstrap/lib/CardBody';
import Nav from 'reactstrap/lib/Nav';
import NavItem from 'reactstrap/lib/NavItem';
import NavLink from 'reactstrap/lib/NavLink';
import TabContent from 'reactstrap/lib/TabContent';
import TabPane from 'reactstrap/lib/TabPane';
import styled from 'styled-components';

import {
  setActiveTab,
} from 'redux/ducks/financial-forecast/actions';

import TransactionsPage from './TransactionsPage';
import Estimates from './Estimates';
import Timeline from './Timeline';
import Labels from './Labels';
import Settings from './Settings';

import TransactionDataInterface from 'models/ITransactionData';

import Transactions from './components/Transactions';
import GlobalFilters from './containers/GlobalFilters';

type State = {
}

type Props = {
  tab: string,
  setActiveTab: typeof setActiveTab,
  transactions: TransactionDataInterface[],
  allTransactions: TransactionDataInterface[],
}

const NumberTransactionsFiltered = styled.p`
  margin: 10px 0px 20px 0px;
  font-weight: 500;
`;

class FinancialForecast extends Component<Props, State> {
  static propTypes = {
  }

  static defaultProps = {
  }

  state: State = {
  }

  render() {
    const {
      tab,
      setActiveTab,
      transactions,
      allTransactions,
    } = this.props;

    return (
      <div>
        <Row>
          <Col xs="12">
            <Card>
              <CardBody>
                <GlobalFilters />
              </CardBody>
            </Card>
          </Col>
          <Col xs="12" style={{ marginTop: '20px' }}>
            <Nav tabs>
              <NavItem>
                <NavLink
                  className={classnames({ active: tab === 'transactions' })}
                  onClick={() => { setActiveTab('transactions'); }}
                >
                  Transactions
            </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: tab === 'estimates' })}
                  onClick={() => { setActiveTab('estimates'); }}
                >
                  Estimates
            </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: tab === 'timeline' })}
                  onClick={() => { setActiveTab('timeline'); }}
                >
                  Timeline
            </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: tab === 'tags' })}
                  onClick={() => { setActiveTab('tags'); }}
                >
                  Tags
            </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: tab === 'settings' })}
                  onClick={() => { setActiveTab('settings'); }}
                >
                  Settings
            </NavLink>
              </NavItem>
            </Nav>
            <NumberTransactionsFiltered>
              Displaying {transactions.length} of {allTransactions.length} transactions.
            </NumberTransactionsFiltered>
            <TabContent activeTab={tab}>
              <TabPane tabId="transactions">
                <TransactionsPage
                  TransactionsComponent={Transactions}
                />
              </TabPane>
              <TabPane tabId="estimates">
                <Estimates
                  TransactionsComponent={Transactions}
                />
              </TabPane>
              <TabPane tabId="timeline">
                <Timeline />
              </TabPane>
              <TabPane tabId="tags">
                <Labels />
              </TabPane>
              <TabPane tabId="settings">
                <Settings />
              </TabPane>
            </TabContent>

          </Col>
        </Row>
      </div>
    );
  }
}

export default connect(
  (state: any) => {
    const {
      financialForecast: {
        tab,
        transactions,
        allTransactions,
      },
    } = state;

    return {
      tab,
      transactions: transactions ? transactions.toJS() : [],
      allTransactions: allTransactions ? allTransactions.toJS() : [],
    }
  },
  {
    setActiveTab,
  }
)(FinancialForecast);
