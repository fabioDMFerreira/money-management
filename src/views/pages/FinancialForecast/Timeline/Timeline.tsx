import React, { Component, Fragment } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import { faChartLine, faTable } from '@fortawesome/free-solid-svg-icons';
import Row from 'reactstrap/lib/Row';
import Col from 'reactstrap/lib/Col';
import moment from 'moment';


import BalanceTable from './components/BalanceTable';
import { ForecastEditableFieldsType } from 'state/ducks/financial-forecast/actions';
import TransactionConfig from 'models/Transaction/TransactionConfig';
import Forecast from 'models/Forecast/Forecast';
import calculateForecastBalance from 'models/Balance/calculateForecastBalance';
import Transaction from 'models/Transaction';
import Balance from 'models/Balance/Balance';
import YYYYMM from 'utils/YYYYMM';
import TransactionsTable from '../TransactionsPage';
import YYYYMMDD from 'utils/YYYYMMDD';
import ToggleButton from 'views/components/ToggleButton';
import { WalletConfig } from 'state/ducks/wallets';

type forecastView = "chart" | "table";

type State = {
  balance: Balance[],
  forecastView: forecastView,
  monthSelected?: string,
  monthBalance?: Balance,
  transactions: TransactionConfig[],
  estimatesTransactions: TransactionConfig[],
};

type Props = {
  transactions: TransactionConfig[],
  estimatesTransactions: TransactionConfig[],
  hideControls?: boolean,
  wallets: WalletConfig[]
};

export default class BalanceComponent extends Component<Props, State> {

  static propTypes = {
  }

  static defaultProps = {
    transactions: [],
  }

  state: State = {
    balance: [] as Balance[],
    forecastView: "chart",
    transactions: [] as TransactionConfig[],
    estimatesTransactions: [] as TransactionConfig[]
  }

  constructor(props: Props) {
    super(props);

    this.state.balance = this.calculateBalance(props.transactions, props.estimatesTransactions);
  }

  componentDidUpdate(prevProps: Props) {
    if (
      this.props.transactions &&
      (
        prevProps.estimatesTransactions !== this.props.estimatesTransactions ||
        prevProps.transactions !== this.props.transactions
      )
    ) {

      this.setState({
        balance: this.calculateBalance(this.props.transactions, this.props.estimatesTransactions),
      });
    }
  }

  switchForecastView(view: forecastView) {
    this.setState({
      forecastView: view
    });
  }

  calculateBalance = (transactionsData: TransactionConfig[], estimatesData: TransactionConfig[]): Balance[] => {
    const transactions: Transaction[] =
      transactionsData
        .map(transaction => Transaction.buildFromTransactionData(transaction));
    const estimates: Transaction[] =
      estimatesData
        .map(transaction => Transaction.buildFromTransactionData(transaction));

    const startDates = transactions.concat(estimates).map((transaction: Transaction) => transaction.startDate.getTime());
    const endDates = transactions.concat(estimates).map((transaction: Transaction) => transaction.endDate ? transaction.endDate.getTime() : transaction.startDate.getTime());

    let minDate = new Date(Math.min.apply(null, startDates));
    let maxDate = new Date(Math.max.apply(null, endDates));

    // const today = new Date();

    // if (today < maxDate) {
    //   const todayUtcDate = new Date(Date.UTC(today.getFullYear(), today.getMonth() - 1, today.getDate()));

    //   const endValue = this.props.wallets.reduce((total, wallet: Wallet) => {
    //     total += wallet.balance;
    //     return total;
    //   }, 0)

    //   const forecastBeforeToday = new Forecast(minDate, firstMonthDay(todayUtcDate), { endValue });
    //   const forecastAfterToday = new Forecast(firstMonthDay(todayUtcDate), maxDate, { initialValue: endValue });

    //   console.log([
    //     calculateReverseBalance(forecastBeforeToday, transactions),
    //     calculateForecastBalance(forecastAfterToday, transactions),
    //   ]);

    // }

    const forecast: Forecast = new Forecast(minDate, maxDate, { initialValue: 0 });
    const balance: Balance[] = calculateForecastBalance(forecast, transactions);

    const forecastStartValue = balance && balance.length ? "" + balance[0].actualValue : "0";

    const estimateForecast: Forecast = new Forecast(minDate, maxDate, { initialValue: +forecastStartValue });
    const estimatesBalance = calculateForecastBalance(estimateForecast, estimates);

    balance.forEach((monthBalance: Balance) => {
      const estimate = estimatesBalance.find((month: Balance) => monthBalance.date && month.date && YYYYMMDD(month.date) === YYYYMMDD(monthBalance.date) ? true : false);

      if (estimate) {
        monthBalance.estimateValue = monthBalance.actualValue && estimate.actualValue ? monthBalance.actualValue + (estimate.actualValue - +forecastStartValue) : estimate.actualValue;
      }
    });

    return balance;
  }

  chartClick = (point: any) => {
    const monthSelected = point.activeLabel;

    this.setState({
      monthSelected,
      transactions: this.props.transactions.filter(transaction => {
        return moment(transaction.startDate).format('YYYY-MM') === monthSelected; 0
      }),
      monthBalance: this.state.balance.find((balance: Balance) => moment(balance.date).format('YYYY-MM') === monthSelected)
    });
  }

  render() {
    const {
      forecastView,
      balance,
      monthSelected,
      transactions,
      monthBalance
    } = this.state;

    const {
      hideControls
    } = this.props;

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
