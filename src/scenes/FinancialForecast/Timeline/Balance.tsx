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


import BalanceTable from './BalanceTable';
import { ForecastDataInterface } from '../ForecastDataInterface';
import { updateForecast, ForecastEditableFieldsType, filterType } from '../FinancialForecastActions';
import TransactionDataInterface from '../TransactionDataInterface';
import passesFilters from './passesFilters';
import Forecast from '../services/Forecast.class';
import calculateForecastBalance from '../services/calculateForecastBalance';
import Transaction from '../services/Transaction.class';
import Balance from '../services/Balance.interface';
import YYYYMM from 'utils/YYYYMM';
import TransactionsTable from '../containers/TransactionsTable';

type forecastView = "chart" | "table";

type State = {
  balance: Balance[],
  forecastView: forecastView,
  monthSelected?: string,
  monthBalance?: Balance,
  transactions: TransactionDataInterface[]
};

type Props = {
  transactions: TransactionDataInterface[],
  forecast: ForecastDataInterface,
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
    transactions: [] as TransactionDataInterface[]
  }

  constructor(props: Props) {
    super(props);

    this.state.balance = this.calculateBalance(props.transactions);
  }

  componentDidUpdate(prevProps: Props) {
    if (
      this.props.transactions &&
      this.props.forecast &&
      (
        prevProps.transactions !== this.props.transactions ||
        prevProps.forecast !== this.props.forecast ||
        prevProps.filters !== this.props.filters
      )
    ) {

      this.setState({
        balance: this.calculateBalance(this.props.transactions),
      });
    }
  }

  updateForecast = (keyName: ForecastEditableFieldsType) => {
    return (e: any) => {
      this.props.updateForecast(keyName, e.target.value)
    }
  }

  switchForecastView(view: forecastView) {
    this.setState({
      forecastView: view
    });
  }

  calculateBalance = (transactionsData: TransactionDataInterface[]): Balance[] => {
    const transactions: Transaction[] =
      transactionsData
        .filter(transaction => transaction.visible)
        .filter(passesFilters(this.props.filters))
        .map(transaction => Transaction.buildFromTransactionData(transaction));
    const forecast: Forecast = this.transformForecast(this.props.forecast.initialValue, this.props.forecast.startDate, this.props.forecast.endDate);

    return calculateForecastBalance(forecast, transactions);
  }

  transformForecast = (initialValue: string, startDate: string, endDate: string): Forecast => {
    return new Forecast(new Date(startDate), new Date(endDate), +initialValue)
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
        <Col xs={2}>
          <FormGroup>
            <Label>Initial value:</Label>
            <Input
              value={forecast.initialValue}
              type="number"
              onChange={this.updateForecast('initialValue')}
            />
          </FormGroup>
        </Col>
        <Col xs={3}>
          <FormGroup>
            <Label>Start date:</Label>
            <Input
              value={forecast.startDate}
              type="date"
              onChange={this.updateForecast('startDate')}
            />
          </FormGroup>
        </Col>
        <Col xs={3}>
          <FormGroup>
            <Label>End date:</Label>
            <Input
              value={forecast.endDate}
              type="date"
              onChange={this.updateForecast('endDate')}
            />
          </FormGroup>
        </Col>
        <Col xs={3}>
          <Button {...(forecastView === 'chart' ? {} : { outline: true })} color="secondary" size="sm" onClick={() => this.switchForecastView('chart')}>Chart <FontAwesomeIcon icon={faChartLine} /></Button>
          <Button {...(forecastView === 'table' ? {} : { outline: true })} color="secondary" size="sm" onClick={() => this.switchForecastView('table')}>Table <FontAwesomeIcon icon={faTable} /></Button>
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
