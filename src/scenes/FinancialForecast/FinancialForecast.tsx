import React, { Component } from 'react';
import Row from 'reactstrap/lib/Row';
import Col from 'reactstrap/lib/Col';
import Input from 'reactstrap/lib/Input';
import Button from 'reactstrap/lib/Button';
import FormGroup from 'reactstrap/lib/FormGroup';
import Label from 'reactstrap/lib/Label';
import ReactTable from 'react-table';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

import Transaction from './Balance/Transaction.class';
import Forecast from './Balance/Forecast.class';
import calculateForecastBalance from './Balance/calculateForecastBalance';
import Balance from './Balance/Balance.interface';

import "react-table/react-table.css";


interface TransactionData {
  description: string,
  value: string,
  startDate?: string,
  endDate?: string,
}

interface ForecastData {
  initialValue: string,
  startDate: string,
  endDate: string,
}

interface FinancialForecastState {
  forecast: ForecastData,
  transactions: TransactionData[],
  balance?: Balance[],
}

const YYYYMMDD = (date: Date) => {
  const year = '' + date.getFullYear();
  let month = '' + date.getMonth() + 1;
  let day = '' + date.getDate();

  if (day.length === 1) {
    day = '0' + day;
  }

  if (month.length === 1) {
    month = '0' + month;
  }

  return year + '-' + month + '-' + day;
}

class FinancialForecast extends Component {
  static propTypes = {
  }

  static defaultProps = {
  }

  state: FinancialForecastState = {
    forecast: {
      initialValue: '1000',
      startDate: '2018-01-01',
      endDate: '2018-12-01',
    },
    transactions: []
  }

  constructor(props: any) {
    super(props);


    const transactions: Transaction[] = this.transformTransactions(this.state.transactions);
    const forecast: Forecast = this.transformForecast(this.state.forecast.initialValue, this.state.forecast.startDate, this.state.forecast.endDate);

    this.state.balance = calculateForecastBalance(forecast, transactions);
  }

  componentDidUpdate(prevProps: any, prevState: FinancialForecastState) {
    if (
      this.state.transactions &&
      this.state.forecast &&
      (
        prevState.transactions !== this.state.transactions ||
        prevState.forecast !== this.state.forecast
      )
    ) {

      const transactions: Transaction[] = this.transformTransactions(this.state.transactions);
      const forecast: Forecast = this.transformForecast(this.state.forecast.initialValue, this.state.forecast.startDate, this.state.forecast.endDate);

      this.setState({
        balance: calculateForecastBalance(forecast, transactions),
      })
    }
  }

  transformTransactions = (data: TransactionData[]): Transaction[] => {
    return data.map(transaction => {

      const startDate = transaction.startDate ? new Date(transaction.startDate) : undefined;
      const endDate = transaction.endDate ? new Date(transaction.endDate) : undefined;

      return new Transaction(transaction.description, +transaction.value, startDate, endDate);
    })
  }

  transformForecast = (initialValue: string, startDate: string, endDate: string): Forecast => {
    return new Forecast(new Date(startDate), new Date(endDate), +initialValue)
  }

  addTransaction = () => {
    const transactions = this.state.transactions.slice();
    transactions.unshift({
      description: "New Transaction",
      value: "0",
      startDate: '2018-01-15',
      endDate: '2018-01-15',
    });

    this.setState({
      transactions
    });
  }

  removeTransaction = (index: number) => {
    const transactions = this.state.transactions.filter((transaction, tindex) => tindex !== index);

    this.setState({
      transactions
    });
  }

  updateTransaction = (index: number, value: string, keyName: "value" | "description" | "startDate" | "endDate") => {

    const transactions: TransactionData[] = this.state.transactions.map((transaction, tindex) => {
      if (index === tindex) {
        transaction[keyName] = value;
      }
      return transaction;
    });

    this.setState({
      transactions,
    });
  }

  editableCell = (cellInfo: any, type: "text" | "date" | "number") => {
    return <span>
      <Input
        type={type || 'text'}
        value={cellInfo.value}
        onChange={e => {
          this.updateTransaction(cellInfo.index, e.target.value, cellInfo.column.id)
        }}
      />
    </span>
  }

  updateForecast = (keyName: 'initialValue' | 'startDate' | 'endDate') => {
    return (e: any) => {
      const forecast = { ...this.state.forecast };
      forecast[keyName] = e.target.value;
      this.setState({ forecast });
    }
  }

  columns: object[] = [
    {
      Header: 'Description',
      accessor: "description",
      Cell: this.editableCell,
    }, {
      Header: 'Start date',
      accessor: "startDate",
      Cell: (props: any) => this.editableCell(props, 'date'),
    },
    {
      Header: 'End date',
      accessor: "endDate",
      Cell: (props: any) => this.editableCell(props, 'date'),
    }, {
      Header: 'Value',
      accessor: "value",
      Cell: (props: any) => this.editableCell(props, 'number')
    }, {
      Header: '',
      acessor: '',
      width: 50,
      Cell: (props: any) => <Button onClick={() => this.removeTransaction(props.index)}>-</Button>
    }
  ];

  render() {
    const { transactions, balance, forecast } = this.state;

    return (
      <div>
        <h1>Financial Forecast</h1>
        <Row>
          <Col xs="6">
            <Button onClick={this.addTransaction}>+</Button>
            <ReactTable
              data={transactions}
              columns={this.columns}
            />
          </Col>
          <Col xs="6">
            <Row>
              <Col xs={4}>
                <FormGroup>
                  <Label>Initial value:</Label>
                  <Input
                    value={forecast.initialValue}
                    type="number"
                    onChange={this.updateForecast('initialValue')}
                  />
                </FormGroup>
              </Col>
              <Col xs={4}>
                <FormGroup>
                  <Label>Start date:</Label>
                  <Input
                    value={forecast.startDate}
                    type="date"
                    onChange={this.updateForecast('startDate')}
                  />
                </FormGroup>
              </Col>
              <Col xs={4}>
                <FormGroup>
                  <Label>End date:</Label>
                  <Input
                    value={forecast.endDate}
                    type="date"
                    onChange={this.updateForecast('endDate')}
                  />
                </FormGroup>
              </Col>
            </Row>


            <LineChart
              width={900}
              height={300}
              data={balance}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="actualValue" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
          </Col>
        </Row>
      </div>
    );
  }
}

export default FinancialForecast;
