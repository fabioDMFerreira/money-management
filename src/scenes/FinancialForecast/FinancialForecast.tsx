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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinusCircle, faUpload, faDownload } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { CSVLink } from 'react-csv';

import Transaction from './Balance/Transaction.class';
import Forecast from './Balance/Forecast.class';
import calculateForecastBalance from './Balance/calculateForecastBalance';
import Balance from './Balance/Balance.interface';

import { sumMonths } from './Balance/utils';

const TableActions = styled.div`
  margin-bottom:10px;
`;

//var csv is the CSV file with headers
function csvJSON(csv: string, headersMapper: object[]): any {

  var lines = csv.split("\n");

  var result = [];

  let headers = lines[0].split(",").map(str => str.replace(/"/g, ""));

  if (headers) {
    headers =
      headers.map(header => {
        const mappedHeader: any = headersMapper.find((h: any) => h.label === header);
        return mappedHeader ? mappedHeader.key : header;
      });
  }

  for (var i = 1; i < lines.length; i++) {

    var obj: any = {};
    var currentline = lines[i].split(",");

    for (var j = 0; j < headers.length; j++) {
      obj[headers[j]] = currentline[j].replace(/"/g,"");
    }

    result.push(obj);

  }

  //return result; //JavaScript object
  return result; //JSON
}

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
  let month = '' + (date.getMonth() + 1);
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
      initialValue: '0',
      startDate: YYYYMMDD(new Date()),
      endDate: YYYYMMDD(sumMonths(new Date(), 12)),
    },
    transactions: []
  }

  fileInput: any;

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
      startDate: YYYYMMDD(new Date()),
      endDate: '',
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

  downloadTransactions = (event: any) => {
    const reader = new FileReader();
    const file = this.fileInput.files[0];

    reader.onerror = () => {
    };
    reader.onload = (csv =>
      (e: any) => {
        const transactions: TransactionData[] = csvJSON(e.target.result, this.csvHeaders);
        console.log({ transactions });
        this.setState({
          transactions: this.state.transactions.concat(transactions)
        });
      }
    )(file);

    reader.readAsText(file);
  }

  columns: object[] = [
    {
      Header: 'Description',
      accessor: "description",
      Cell: (props: any) => this.editableCell(props, 'text'),
    }, {
      Header: 'Start date',
      accessor: "startDate",
      Cell: (props: any) => this.editableCell(props, 'date'),
      width: 180
    },
    {
      Header: 'End date',
      accessor: "endDate",
      Cell: (props: any) => this.editableCell(props, 'date'),
      width: 180
    }, {
      Header: 'Value',
      accessor: "value",
      Cell: (props: any) => this.editableCell(props, 'number'),
      width: 100
    }, {
      Header: '',
      acessor: '',
      Cell: (props: any) => <Button color="link" onClick={() => this.removeTransaction(props.index)}><FontAwesomeIcon icon={faMinusCircle} /></Button>,
      width: 50,
    }
  ];

  csvHeaders: object[] = [{
    label: 'Description',
    key: 'description'
  }, {
    label: 'Start date',
    key: 'startDate'
  }, {
    label: 'End date',
    key: 'endDate'
  }, {
    label: 'Value',
    key: 'value'
  }]

  render() {
    const { transactions, balance, forecast } = this.state;

    return (
      <div>
        <h3>Financial Forecast</h3>
        <hr />
        <Row>
          <Col xs="5">
            <TableActions>
              <Button outline color="secondary" size="sm" onClick={this.addTransaction}>
                <FontAwesomeIcon icon={faPlus} /> Add
              </Button>
              <CSVLink
                data={transactions}
                filename={`transactions-${YYYYMMDD(new Date())}.csv`}
                headers={this.csvHeaders}
              >
                <Button outline color="secondary" size="sm">
                  <FontAwesomeIcon icon={faUpload} /> Upload
              </Button>
              </CSVLink>
              <Button outline color="secondary" size="sm" onClick={() => this.fileInput.click()}>
                <FontAwesomeIcon icon={faDownload} /> Download
              </Button>
              <input
                title="Import from .csv file"
                type="file"
                accept=".csv"
                ref={(input) => { this.fileInput = input; }}
                onChange={this.downloadTransactions}
                style={{ display: 'none' }}
              />
            </TableActions>
            <ReactTable
              data={transactions}
              columns={this.columns}
              defaultPageSize={10}
            />
          </Col>
          <Col xs="7">
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
            </Row>


            <LineChart
              width={900}
              height={300}
              data={balance ? balance.map((b: Balance) => ({ ...b, date: b.date ? YYYYMMDD(b.date) : null })) : []}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="actualValue" name="Amount (€)" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
          </Col>
        </Row>
      </div>
    );
  }
}

export default FinancialForecast;
