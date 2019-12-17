import { faChartLine, faTable, faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Balance } from 'models/Balance/Balance';
import { TransactionConfig } from 'models/Transaction/TransactionConfig';
import moment from 'moment';
import React, { Component, Fragment } from 'react';
import Button from 'reactstrap/lib/Button';
import Col from 'reactstrap/lib/Col';
import Row from 'reactstrap/lib/Row';
import {
  CartesianGrid, Legend, Line, LineChart, ResponsiveContainer,
  Tooltip, XAxis, YAxis,
} from 'recharts';
import YYYYMM from 'utils/YYYYMM';
import Onboarding from 'views/components/Onboarding';
import ToggleButton from 'views/components/ToggleButton';

import Transactions from '../components/Transactions';
import TransactionsTable from '../TransactionsPage';
import BalanceTable from './components/BalanceTable';


type forecastView = 'chart' | 'table';

type State = {
  forecastView: forecastView;
  monthSelected?: string;
  monthBalance?: Balance;
  transactions: TransactionConfig[];
};

type Props = {
  transactions: TransactionConfig[];
  hideControls?: boolean;
  balance: Balance[];
};

export default class Timeline extends Component<Props, State> {
  static propTypes = {
  }

  static defaultProps = {
    transactions: [],
  }

  state: State = {
    forecastView: 'chart',
    transactions: [] as TransactionConfig[],
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.transactions !== this.props.transactions && this.state.monthSelected) {
      this.filterByMonth(this.state.monthSelected);
    }
  }

  switchForecastView(view: forecastView) {
    this.setState({
      forecastView: view,
    });
  }

  filterByMonth = (monthSelected: string) => {
    if (!monthSelected) {
      return;
    }

    this.setState({
      monthSelected,
      transactions: this.props.transactions.filter(transaction => moment(transaction.startDate).format('YYYY-MM') === monthSelected),
      monthBalance: this.props.balance.find((balance: Balance) => moment(balance.date).format('YYYY-MM') === monthSelected),
    });
  }

  chartClick = (point: any) => {
    const monthSelected = point && point.activeLabel;
    this.filterByMonth(monthSelected);
  }

  render() {
    const {
      forecastView,
      monthSelected,
      transactions,
      monthBalance,
    } = this.state;

    const {
      balance,
      hideControls,
      transactions: propsTransactions,
    } = this.props;

    if (!propsTransactions.length) {
      return (
        <Row>
          <Col xs="6">
            <Onboarding transactions={propsTransactions} />
          </Col>
        </Row>
      );
    }

    return (
      <Fragment>
        {
          !hideControls &&
          <Row>
            <Col xs={3} className="mb-4">
              <ToggleButton active={forecastView === 'chart'} onClick={() => { this.switchForecastView('chart'); }} icon={faChartLine} text="Chart" />
              <ToggleButton active={forecastView === 'table'} onClick={() => { this.switchForecastView('table'); }} icon={faTable} text="Table" />
            </Col>
          </Row>
        }

        {
          (() => {
            if (forecastView === 'table') {
              return <BalanceTable balance={balance} />;
            }
            return (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart
                  data={balance ? balance.map((b: Balance) => ({ ...b, date: b.date ? YYYYMM(b.date) : null })) : []}
                  onClick={this.chartClick}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="actualValue" name="Amount (€)" stroke="#8884d8" activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="estimateValue" name="Estimated Amount (€)" stroke="#82ca9d" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            );
          })()
        }

        {
          monthSelected &&
          <Fragment>
            <hr />
            <div style={{ backgroundColor: 'beige', padding: 8 }}>
              <Row>
                <Col xs={11}>
                  <h3>{monthSelected} transactions</h3>
                </Col>
                <Col xs={1} style={{ textAlign: 'right' }}>
                  <Button
                    color="link"
                    onClick={() => this.setState({ monthSelected: undefined })}
                  >
                    <FontAwesomeIcon icon={faWindowClose} />
                  </Button>
                </Col>
              </Row>
              {
                monthBalance &&
                <Fragment>
                  <p>
                    Actual value: {monthBalance.actualValue}
                  </p>
                  <p>
                    Balance:  {monthBalance.balance}
                  </p>
                  <p>
                    Income: {monthBalance.income}
                  </p>
                  <p>
                    Outcome: {monthBalance.outcome}
                  </p>
                </Fragment>
              }

              <TransactionsTable
                TransactionsComponent={Transactions}
                transactions={transactions}
              />
            </div>
          </Fragment>

        }
      </Fragment>);
  }
}
