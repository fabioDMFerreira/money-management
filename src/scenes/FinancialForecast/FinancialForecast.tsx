import React, { Component } from 'react';
import Row from 'reactstrap/lib/Row';
import Col from 'reactstrap/lib/Col';
import Input from 'reactstrap/lib/Input';
import Button from 'reactstrap/lib/Button';
import FormGroup from 'reactstrap/lib/FormGroup';
import Label from 'reactstrap/lib/Label';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faUpload, faDownload } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { CSVLink } from 'react-csv';

import Transaction from './Balance/Transaction.class';
import Forecast from './Balance/Forecast.class';
import calculateForecastBalance from './Balance/calculateForecastBalance';
import Balance from './Balance/Balance.interface';

import { sumMonths } from './Balance/utils';
import TransactionData from './TransactionData.interface';

import YYYYMMDD from 'utils/YYYYMMDD';
import csvJSON from 'utils/csvJSON';

import ImportTransactionsModal from './components/ImportTransactionsModal';
import TransactionsTable from './components/TransactionsTable';
import transactionEditableFields from './transactionEditableFields';

const TableActions = styled.div`
  margin-bottom:10px;
`;

type ForecastData = {
  initialValue: string,
  startDate: string,
  endDate: string,
}

type State = {
  forecast: ForecastData,
  transactions: TransactionData[],
  dbTransactions: Transaction[],
  balance: Balance[],
  importingModalOpened: boolean,
  importingData: object[],
}

type Props = {
}

class FinancialForecast extends Component<Props, State> {
  static propTypes = {
  }

  static defaultProps = {
  }

  state: State = {
    forecast: {
      initialValue: '0',
      startDate: YYYYMMDD(new Date()),
      endDate: YYYYMMDD(sumMonths(new Date(), 12)),
    },
    balance: [],
    transactions: [],
    importingModalOpened: false,
    importingData: [],
    dbTransactions: [],
  }

  fileInput: any;

  constructor(props: any) {
    super(props);

    const transactions: Transaction[] = this.transformTransactions(this.state.transactions);
    const forecast: Forecast = this.transformForecast(this.state.forecast.initialValue, this.state.forecast.startDate, this.state.forecast.endDate);

    this.state.balance = calculateForecastBalance(forecast, transactions);
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    if (
      this.state.dbTransactions &&
      this.state.forecast &&
      (
        prevState.dbTransactions !== this.state.dbTransactions ||
        prevState.forecast !== this.state.forecast
      )
    ) {

      const forecast: Forecast = this.transformForecast(this.state.forecast.initialValue, this.state.forecast.startDate, this.state.forecast.endDate);

      this.setState({
        balance: calculateForecastBalance(forecast, this.state.dbTransactions),
        transactions: this.state.dbTransactions.map(transaction => transaction.convertToTransactionData())
      });
    }
  }

  transformTransactions = (data: TransactionData[]): Transaction[] => {
    return data.map(transactionData => {

      const startDate = transactionData.startDate ? new Date(transactionData.startDate) : undefined;
      const endDate = transactionData.endDate ? new Date(transactionData.endDate) : undefined;
      const value = transactionData.credit ? transactionData.credit : transactionData.debit;

      const transaction = new Transaction(transactionData.description, value ? +value : 0, startDate);

      if (endDate) {
        transaction.endDate = endDate;
      }

      return transaction;
    })
  }

  transformForecast = (initialValue: string, startDate: string, endDate: string): Forecast => {
    return new Forecast(new Date(startDate), new Date(endDate), +initialValue)
  }

  addNewTransaction = () => {
    const transaction = new Transaction("New Transaction", 0, new Date());
    const dbTransactions = this.state.dbTransactions.slice();
    dbTransactions.unshift(transaction);

    this.setState({
      dbTransactions
    });
  }

  addTransactions = (newTransactions: TransactionData[]) => {
    const dbTransactions = this.state.dbTransactions.concat(newTransactions.map(transaction => Transaction.buildFromTransactionData(transaction)));

    this.setState({
      dbTransactions
    });
  }

  removeTransaction = (id: string) => {
    const dbTransactions = this.state.dbTransactions.filter((transaction) => transaction.id !== id);

    this.setState({
      dbTransactions
    });
  }

  updateTransaction = (id: string, value: string, keyName: transactionEditableFields) => {
    const dbTransactions: Transaction[] = this.state.dbTransactions.map((transaction) => {
      if (transaction.id === id) {
        switch (keyName) {
          case 'credit':
            transaction.value = +value;
            break;
          case 'debit':
            transaction.value = -(+value);
            break;
          case 'startDate':
            transaction.startDate = value ? new Date(value) : new Date();
            break;
          case 'endDate':
            transaction.endDate = value ? new Date(value) : new Date();
            break;
          case 'description':
            transaction.description =value;
            break;
          case 'particles':
            transaction.particles = +value;
            break;
          case 'interval':
            transaction.interval = +value;
            break;
          default:
            break;
        }
        console.log({
          transaction: transaction.convertToTransactionData()
        })
      }
      return transaction;
    });

    this.setState({
      dbTransactions,
    });
  }

  updateForecast = (keyName: 'initialValue' | 'startDate' | 'endDate') => {
    return (e: any) => {
      const forecast = { ...this.state.forecast };
      forecast[keyName] = e.target.value;
      this.setState({ forecast });
    }
  }

  importTransactions = (event: any) => {
    const reader = new FileReader();
    const file = this.fileInput.files[0];

    reader.onerror = () => {
    };
    reader.onload = (csv =>
      (e: any) => {
        const csvContent = csvJSON(e.target.result, this.csvHeaders);
        if (csvContent.length && (
          !csvContent[0].description ||
          !csvContent[0].startDate ||
          !csvContent[0].value
        )) {
          this.setState({
            importingModalOpened: true,
            importingData: csvContent,
          });
        } else {
          const transactions: TransactionData[] = csvContent;
          this.setState({
            transactions: this.state.transactions.concat(transactions)
          });
        }

      }
    )(file);

    reader.readAsText(file);
  }



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
    const {
      transactions,
      balance,
      forecast,
      importingModalOpened,
      importingData,
    } = this.state;

    return (
      <div>
        <Row>
          <Col xs="12">
            <h3>Transactions</h3>

            <TableActions>
              <Button outline color="secondary" size="sm" onClick={this.addNewTransaction}>
                <FontAwesomeIcon icon={faPlus} /> Add
              </Button>
              <CSVLink
                data={transactions}
                filename={`transactions-${YYYYMMDD(new Date())}.csv`}
                headers={this.csvHeaders}
              >
                <Button outline color="secondary" size="sm">
                  <FontAwesomeIcon icon={faUpload} /> Export
              </Button>
              </CSVLink>
              <Button outline color="secondary" size="sm" onClick={() => this.fileInput.click()}>
                <FontAwesomeIcon icon={faDownload} /> Import
              </Button>
              <input
                title="Import from .csv file"
                type="file"
                accept=".csv"
                ref={(input) => { this.fileInput = input; }}
                onChange={this.importTransactions}
                style={{ display: 'none' }}
              />
            </TableActions>
            <TransactionsTable
              transactions={transactions}
              updateTransaction={this.updateTransaction}
              removeTransaction={this.removeTransaction}
            />
          </Col>
          <Col xs="12">
            <hr />

            <h3>Forecast</h3>

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

        <ImportTransactionsModal
          opened={importingModalOpened}
          data={importingData}
          save={(transactions) => {
            this.addTransactions(transactions);
            this.setState({
              importingModalOpened: false
            });
          }
          }
          close={() => this.setState({ importingModalOpened: false })}
        />
      </div>
    );
  }
}

export default FinancialForecast;
