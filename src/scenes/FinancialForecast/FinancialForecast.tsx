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
import { faPlus, faUpload, faDownload, faTrash, faChartLine, faTable } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { CSVLink } from 'react-csv';

import Transaction from './Balance/Transaction.class';
import Forecast from './Balance/Forecast.class';
import calculateForecastBalance from './Balance/calculateForecastBalance';
import Balance from './Balance/Balance.interface';

import { sumMonths } from './Balance/utils';
import TransactionData from './TransactionDataInterface';

import YYYYMMDD from 'utils/YYYYMMDD';
import csvJSON from 'utils/csvJSON';

import ImportTransactionsModal from './components/ImportTransactionsModal';
import TransactionsTable from './components/TransactionsTable';
import TransactionMetadata from './TransactionFieldsMetadata';
import validateTransactionData from './validateTransactionData';
import BalanceTable from './components/BalanceTable';
import { connect } from 'react-redux';
import {
  addNewTransaction,
  bulkAddTransactions,
  updateTransaction,
  deleteTransaction,
  clearTransactions,
  dragTransaction,
  createTag,
  changeTransactionsVisibilityByFilter,
} from './FinancialForecastActions';
import TransactionDataInterface from './TransactionDataInterface';
import { TagType } from './TagType';

const TableActions = styled.div`
  margin-bottom:10px;

  button{
    margin: 0px 10px 0px 0px;
  }
`;

type forecastView = "chart" | "table";

type ForecastData = {
  initialValue: string,
  startDate: string,
  endDate: string,
}

type State = {
  forecast: ForecastData,
  transactions: TransactionData[],
  balance: Balance[],
  importingModalOpened: boolean,
  importingData: object[],
  forecastView: forecastView,
}

type Props = {
  transactions: TransactionDataInterface[],
  addNewTransaction: typeof addNewTransaction,
  bulkAddTransactions: typeof bulkAddTransactions,
  updateTransaction: typeof updateTransaction,
  deleteTransaction: typeof deleteTransaction,
  clearTransactions: typeof clearTransactions,
  dragTransaction: typeof dragTransaction
  createTag: typeof createTag,
  tags: TagType[],
  changeTransactionsVisibilityByFilter: typeof changeTransactionsVisibilityByFilter
}

class FinancialForecast extends Component<Props, State> {
  static propTypes = {
  }

  static defaultProps = {
    transactions: [],
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
    forecastView: "chart",
  }

  fileInput: any;

  constructor(props: Props) {
    super(props);


    this.state.balance = this.calculateBalance(props.transactions);
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    if (
      this.props.transactions &&
      this.state.forecast &&
      (
        prevProps.transactions !== this.props.transactions ||
        prevState.forecast !== this.state.forecast
      )
    ) {

      this.setState({
        balance: this.calculateBalance(this.props.transactions),
        transactions: this.props.transactions,
      });
    }
  }

  calculateBalance = (transactionsData: TransactionDataInterface[]): Balance[] => {
    const transactions: Transaction[] =
      transactionsData
        .filter(transaction => transaction.visible)
        .map(transaction => Transaction.buildFromTransactionData(transaction));
    const forecast: Forecast = this.transformForecast(this.state.forecast.initialValue, this.state.forecast.startDate, this.state.forecast.endDate);

    return calculateForecastBalance(forecast, transactions);
  }

  transformForecast = (initialValue: string, startDate: string, endDate: string): Forecast => {
    return new Forecast(new Date(startDate), new Date(endDate), +initialValue)
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
        const csvContent = csvJSON(e.target.result, TransactionMetadata);
        if (csvContent.length && !validateTransactionData(csvContent[0])) {
          this.setState({
            importingModalOpened: true,
            importingData: csvContent,
          });
        } else {
          this.props.bulkAddTransactions(csvContent);
        }

      }
    )(file);

    reader.readAsText(file);
  }

  switchForecastView(view: forecastView) {
    this.setState({
      forecastView: view
    });
  }

  render() {
    const {
      transactions,
      balance,
      forecast,
      importingModalOpened,
      importingData,
      forecastView
    } = this.state;

    const {
      addNewTransaction,
      bulkAddTransactions,
      updateTransaction,
      deleteTransaction,
      clearTransactions,
      dragTransaction,
      createTag,
      tags,
      changeTransactionsVisibilityByFilter
    } = this.props;

    return (
      <div>
        <Row>
          <Col xs="12">
            <h3>Transactions</h3>

            <TableActions>
              <Button outline color="secondary" size="sm" onClick={addNewTransaction}>
                <FontAwesomeIcon icon={faPlus} /> Add
              </Button>
              <CSVLink
                data={transactions}
                filename={`transactions-${YYYYMMDD(new Date())}.csv`}
                headers={TransactionMetadata}
              >
                <Button outline color="secondary" size="sm">
                  <FontAwesomeIcon icon={faUpload} /> Export
              </Button>
              </CSVLink>
              <Button outline color="secondary" size="sm" onClick={() => this.fileInput.click()}>
                <FontAwesomeIcon icon={faDownload} /> Import
              </Button>
              <Button outline color="secondary" size="sm" onClick={clearTransactions}>
                <FontAwesomeIcon icon={faTrash} /> Clear all
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
              updateTransaction={updateTransaction}
              removeTransaction={deleteTransaction}
              dragTransaction={dragTransaction}
              changeTransactionsVisibilityByFilter={changeTransactionsVisibilityByFilter}

              tags={tags}
              createTag={createTag}
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
                    data={balance ? balance.map((b: Balance) => ({ ...b, date: b.date ? YYYYMMDD(b.date) : null })) : []}
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

          </Col>
        </Row>

        <ImportTransactionsModal
          opened={importingModalOpened}
          data={importingData}
          save={(transactions) => {
            bulkAddTransactions(transactions);
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

export default connect(
  (state: any) => {
    const { financialForecast } = state;

    return {
      transactions: financialForecast.transactions && financialForecast.transactions.toJS(),
      tags: financialForecast.tags && financialForecast.tags.toJS(),
    }
  },
  {
    addNewTransaction,
    bulkAddTransactions,
    updateTransaction,
    deleteTransaction,
    clearTransactions,
    dragTransaction,
    createTag,
    changeTransactionsVisibilityByFilter,
  }
)(FinancialForecast);
