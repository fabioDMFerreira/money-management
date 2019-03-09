import React, { Component, Fragment } from 'react';
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
import classnames from 'classnames';

import Transaction from './Balance/Transaction.class';
import Forecast from './Balance/Forecast.class';
import calculateForecastBalance from './Balance/calculateForecastBalance';
import Balance from './Balance/Balance.interface';

import TransactionDataInterface from './TransactionDataInterface';

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
  updateTransactionsFilters,
  filterType,
  updateForecast,
  ForecastEditableFieldsType,
  setActiveTab,
} from './FinancialForecastActions';
import { TagType } from './TagType';
import passesFilters from './passesFilters';
import { ForecastDataInterface } from './ForecastDataInterface';
import Card from 'reactstrap/lib/Card';
import CardBody from 'reactstrap/lib/CardBody';
import CardTitle from 'reactstrap/lib/CardTitle';
import Nav from 'reactstrap/lib/Nav';
import NavItem from 'reactstrap/lib/NavItem';
import NavLink from 'reactstrap/lib/NavLink';
import TabContent from 'reactstrap/lib/TabContent';
import TabPane from 'reactstrap/lib/TabPane';

const TableActions = styled.div`
  background-color: $white;
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
  updateTransactionsFilters: typeof updateTransactionsFilters
  filters: filterType[],
  forecast: ForecastDataInterface,
  updateForecast: typeof updateForecast,
  tab: string,
  setActiveTab: typeof setActiveTab
}

class FinancialForecast extends Component<Props, State> {
  static propTypes = {
  }

  static defaultProps = {
    transactions: [],
  }

  state: State = {
    balance: [],
    importingModalOpened: false,
    importingData: [],
    forecastView: "chart",
  }

  fileInput: any;

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

  parseTransactionsToCsv = (transactions: TransactionDataInterface[]) => {
    return transactions.map(t => {
      return {
        ...t,
        tags: t.tags ? t.tags.map(tag => tag.value).join(',') : []
      }
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

  updateForecast = (keyName: ForecastEditableFieldsType) => {
    return (e: any) => {
      this.props.updateForecast(keyName, e.target.value)
    }
  }

  configureTransactionFromCSV = (transaction: any) =>
    ({
      ...transaction,
      tags: transaction.tags && transaction.tags.split(',').map((tagValue: string) => {
        const tag = this.props.tags.find(tag => tagValue === tag.value);
        if (tag) {
          return {
            ...tag
          };
        };

        // create a new tag if it does not exist in store
        const newOption = { label: tagValue, value: tagValue.toLowerCase(), color: randomColor() }
        this.props.createTag(newOption);

        return newOption;
      })
    })


  importTransactions = (event: any) => {
    const reader = new FileReader();
    const file = this.fileInput.files[0];

    reader.onerror = () => {
    };
    reader.onload = (csv =>
      (e: any) => {
        let csvContent = csvJSON(e.target.result, TransactionMetadata);
        if (csvContent.length && !validateTransactionData(csvContent[0])) {

          csvContent = csvContent.map(this.configureTransactionFromCSV);

          this.setState({
            importingModalOpened: true,
            importingData: csvContent,
          });
        } else {
          csvContent = csvContent.map(this.configureTransactionFromCSV);

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
      balance,
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
      updateTransactionsFilters,
      filters,
      forecast,
      transactions,
      tab,
      setActiveTab,
    } = this.props;

    return (
      <div>
        <Row>
          <Col xs="12">
            <Card>
              <CardBody>
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
                  </Nav>
                </CardTitle>
                <TabContent activeTab={tab}>
                  <TabPane tabId="transactions">
                    <TableActions>
                      <Button outline color="secondary" size="sm" onClick={addNewTransaction}>
                        <FontAwesomeIcon icon={faPlus} /> Add
              </Button>
                      <CSVLink
                        data={this.parseTransactionsToCsv(transactions)}
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

                      filters={filters}
                      updateTransactionsFilters={updateTransactionsFilters}

                      tags={tags}
                      createTag={createTag}
                    />
                  </TabPane>
                  <TabPane tabId="balance">
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
                  </TabPane>
                </TabContent>
              </CardBody>
            </Card>

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
      filters: financialForecast.filters,
      forecast: financialForecast.forecast,
      tab: financialForecast.tab,
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
    updateTransactionsFilters,
    updateForecast,
    setActiveTab,
  }
)(FinancialForecast);
