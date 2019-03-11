import React, { Component } from 'react';
import { connect } from 'react-redux';
import Row from 'reactstrap/lib/Row';
import Col from 'reactstrap/lib/Col';
import classnames from 'classnames';
import Card from 'reactstrap/lib/Card';
import CardBody from 'reactstrap/lib/CardBody';
import CardTitle from 'reactstrap/lib/CardTitle';
import Nav from 'reactstrap/lib/Nav';
import NavItem from 'reactstrap/lib/NavItem';
import NavLink from 'reactstrap/lib/NavLink';
import TabContent from 'reactstrap/lib/TabContent';
import TabPane from 'reactstrap/lib/TabPane';
import styled from 'styled-components';

import {
  setActiveTab,
} from './FinancialForecastActions';

import Balance from './Balance';
import Transactions from './Transactions';
import Labels from './Labels';
import GlobalFilters from './containers/GlobalFilters';
import TransactionDataInterface from './TransactionDataInterface';

type State = {
}

type Props = {
  tab: string,
  setActiveTab: typeof setActiveTab,
  transactions: TransactionDataInterface[],
  allTransactions: TransactionDataInterface[],
}

const GlobalFiltersContainer = styled.div`
  margin-bottom: 15px;
  background-color: #ddd;
  padding: 5px;
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
                <GlobalFiltersContainer>
                  Transactions Filters:
                  <GlobalFilters />
                </GlobalFiltersContainer>
                <CardTitle>
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
                        className={classnames({ active: tab === 'balance' })}
                        onClick={() => { setActiveTab('balance'); }}
                      >
                        Balance
            </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames({ active: tab === 'labels' })}
                        onClick={() => { setActiveTab('labels'); }}
                      >
                        Labels
            </NavLink>
                    </NavItem>
                  </Nav>
                </CardTitle>
                <p>
                  Displaying {transactions.length} transactions of {allTransactions.length}
                </p>
                <TabContent activeTab={tab}>
                  <TabPane tabId="transactions">
                    <Transactions />
                  </TabPane>
                  <TabPane tabId="balance">
                    <Balance />
                  </TabPane>
                  <TabPane tabId="labels">
                    <Labels />
                  </TabPane>
                </TabContent>
              </CardBody>
            </Card>

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
      transactions: transactions.toJS(),
      allTransactions: allTransactions.toJS(),
    }
  },
  {
    setActiveTab,
  }
)(FinancialForecast);
