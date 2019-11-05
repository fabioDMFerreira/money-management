import React, { Component, Fragment } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import { faChartLine, faTable } from '@fortawesome/free-solid-svg-icons';
import Row from 'reactstrap/lib/Row';
import Col from 'reactstrap/lib/Col';
import moment from 'moment';


import BalanceTable from './components/BalanceTable';
import TransactionConfig from 'models/Transaction/TransactionConfig';
import Balance from 'models/Balance/Balance';
import YYYYMM from 'utils/YYYYMM';
import TransactionsTable from '../TransactionsPage';
import ToggleButton from 'views/components/ToggleButton';
import Onboarding from 'views/components/Onboarding';

type forecastView = "chart" | "table";

type State = {
  forecastView: forecastView,
  monthSelected?: string,
  monthBalance?: Balance,
  transactions: TransactionConfig[],
};

type Props = {
  transactions: TransactionConfig[],
  hideControls?: boolean,
  balance: Balance[]
};

export default class BalanceComponent extends Component<Props, State> {

  static propTypes = {
  }

  static defaultProps = {
    transactions: [],
  }

  state: State = {
    forecastView: "chart",
    transactions: [] as TransactionConfig[],
  }

  switchForecastView(view: forecastView) {
    this.setState({
      forecastView: view
    });
  }

  chartClick = (point: any) => {
    const monthSelected = point.activeLabel;

    this.setState({
      monthSelected,
      transactions: this.props.transactions.filter(transaction => {
        return moment(transaction.startDate).format('YYYY-MM') === monthSelected; 0
      }),
      monthBalance: this.props.balance.find((balance: Balance) => moment(balance.date).format('YYYY-MM') === monthSelected)
    });
  }

  render() {
    const {
      forecastView,
      monthSelected,
      transactions,
      monthBalance
    } = this.state;

    const {
      balance,
      hideControls,
      transactions: propsTransactions
    } = this.props;

    if (!propsTransactions.length) {
      return <Row>
        <Col xs="6">
          <Onboarding transactions={propsTransactions} />
        </Col>
      </Row>
    }

    return <Fragment>
      {
        !hideControls &&
        <Row>
          <Col xs={3} className="mb-4">
            <ToggleButton active={forecastView === 'chart'} onClick={() => { this.switchForecastView('chart') }} icon={faChartLine} text="Chart" />
            <ToggleButton active={forecastView === 'table'} onClick={() => { this.switchForecastView('table') }} icon={faTable} text="Table" />
          </Col>
        </Row>
      }

      {
        (() => {
          if (forecastView === 'table') {
            return <BalanceTable balance={balance} />
          } else {
            return <ResponsiveContainer width="100%" height={300}>
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
          }
        })()
      }

      {
        monthSelected &&
        <Fragment>
          <h3>{monthSelected} transactions</h3>
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
            transactions={transactions}
          />
        </Fragment>

      }
    </Fragment>
  }
}
