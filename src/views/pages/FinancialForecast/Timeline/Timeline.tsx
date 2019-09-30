import React, { Component, Fragment } from 'react';
import Input from 'reactstrap/lib/Input';
import Button from 'reactstrap/lib/Button';
import FormGroup from 'reactstrap/lib/FormGroup';
import Label from 'reactstrap/lib/Label';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faTable } from '@fortawesome/free-solid-svg-icons';
import Row from 'reactstrap/lib/Row';
import Col from 'reactstrap/lib/Col';
import moment from 'moment';


import BalanceTable from './components/BalanceTable';
import { ForecastData } from 'models/ForecastData';
import { updateForecast, ForecastEditableFieldsType, filterType } from 'state/ducks/financial-forecast/actions';
import TransactionDataInterface from 'models/TransactionData';
import passesFilters from './passesFilters';
import Forecast from 'models/Forecast';
import calculateForecastBalance from 'models/calculateForecastBalance';
import Transaction from 'models/Transaction';
import Balance from 'models/Balance';
import YYYYMM from 'utils/YYYYMM';
import TransactionsTable from '../TransactionsPage';
import YYYYMMDD from 'utils/YYYYMMDD';
import DateRangePicker from 'views/components/DateRangePicker';
import ToggleButton from 'views/components/ToggleButton';

type forecastView = "chart" | "table";

type State = {
  balance: Balance[],
  forecastView: forecastView,
  monthSelected?: string,
  monthBalance?: Balance,
  transactions: TransactionDataInterface[],
  estimatesTransactions: TransactionDataInterface[]
};

type Props = {
  transactions: TransactionDataInterface[],
  estimatesTransactions: TransactionDataInterface[],
  forecast: ForecastData,
  updateForecast: typeof updateForecast,
  filters: filterType[],
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
    transactions: [] as TransactionDataInterface[],
    estimatesTransactions: [] as TransactionDataInterface[]
  }

  constructor(props: Props) {
    super(props);

    this.state.balance = this.calculateBalance(props.transactions, props.estimatesTransactions);
  }

  componentDidUpdate(prevProps: Props) {
    if (
      this.props.transactions &&
      this.props.forecast &&
      (
        prevProps.estimatesTransactions !== this.props.estimatesTransactions ||
        prevProps.transactions !== this.props.transactions ||
        prevProps.forecast !== this.props.forecast ||
        prevProps.filters !== this.props.filters
      )
    ) {

      this.setState({
        balance: this.calculateBalance(this.props.transactions, this.props.estimatesTransactions),
      });
    }
  }

  updateForecast = (keyName: ForecastEditableFieldsType) => {
    return (value: any) => {
      this.props.updateForecast(keyName, value)
    }
  }

  switchForecastView(view: forecastView) {
    this.setState({
      forecastView: view
    });
  }

  calculateBalance = (transactionsData: TransactionDataInterface[], estimatesData: TransactionDataInterface[]): Balance[] => {
    const transactions: Transaction[] =
      transactionsData
        .filter(transaction => transaction.visible)
        .filter(passesFilters(this.props.filters))
        .map(transaction => Transaction.buildFromTransactionData(transaction));
    const estimates: Transaction[] =
      estimatesData
        .filter(transaction => transaction.visible)
        .filter(passesFilters(this.props.filters))
        .map(transaction => Transaction.buildFromTransactionData(transaction));


    const startDates = transactions.concat(estimates).map((transaction: Transaction) => transaction.startDate.getTime());
    const endDates = transactions.concat(estimates).map((transaction: Transaction) => transaction.endDate ? transaction.endDate.getTime() : transaction.startDate.getTime());

    let minDate = new Date(Math.min.apply(null, startDates));
    let maxDate = new Date(Math.max.apply(null, endDates));

    const forecast: Forecast = this.createForecast("0", minDate, maxDate);
    const balance: Balance[] = calculateForecastBalance(forecast, transactions);

    const forecastStartValue = balance && balance.length ? "" + balance[0].actualValue : "0";

    const estimateForecast: Forecast = this.createForecast(forecastStartValue, minDate, maxDate);
    const estimatesBalance = calculateForecastBalance(estimateForecast, estimates);

    balance.forEach((monthBalance: Balance) => {
      const estimate = estimatesBalance.find((month: Balance) => monthBalance.date && month.date && YYYYMMDD(month.date) === YYYYMMDD(monthBalance.date) ? true : false);

      if (estimate) {
        monthBalance.estimateValue = monthBalance.actualValue && estimate.actualValue ? monthBalance.actualValue + (estimate.actualValue - +forecastStartValue) : estimate.actualValue;
      }
    });

    return balance;
  }

  createForecast = (initialValue: string, startDate: Date, endDate: Date): Forecast => {
    return new Forecast(startDate, endDate, +initialValue)
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
      forecast,
    } = this.props;

    return <Fragment>
      <Row>
        {
          // Filter features deprecated. The timeline values are based on actual transactions/estimates. This way it can be used global filters to filter timeline values.
          /* <Col xs={2}>
          <FormGroup>
            <Label>Initial value:</Label>
            <Input
              value={forecast.initialValue}
              type="number"
              onChange={e => this.updateForecast('initialValue')(e.target.value)}
            />
          </FormGroup>
        </Col>
        <Col xs={4}>
          <FormGroup>
            <Label>Date Range:</Label><br />
            <DateRangePicker
              startDate={forecast.startDate}
              endDate={forecast.endDate}
              updateStartDate={this.updateForecast('startDate')}
              updateEndDate={this.updateForecast('endDate')}
            />
          </FormGroup>
        </Col> */}
        <Col xs={3} className="mb-4">
          <ToggleButton active={forecastView === 'chart'} onClick={() => { this.switchForecastView('chart') }} icon={faChartLine} text="Chart" />
          <ToggleButton active={forecastView === 'table'} onClick={() => { this.switchForecastView('table') }} icon={faTable} text="Table" />
        </Col>
      </Row>

      {
        (() => {
          if (forecastView === 'table') {
            return <BalanceTable balance={balance} />
          } else {
            return <LineChart
              width={900}
              height={300}
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
