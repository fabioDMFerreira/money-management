import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus,
  faUpload,
  faDownload,
  faTrash,
  faEdit,
} from '@fortawesome/free-solid-svg-icons';
import { CSVLink } from 'react-csv';
import Button from 'reactstrap/lib/Button';

import YYYYMMDD from 'utils/YYYYMMDD';
import csvJSON from 'utils/csvJSON';

import TransactionDataInterface from 'models/TransactionData';
import { addNewTransaction, bulkAddTransactions, updateTransaction, deleteTransaction, clearTransactions, dragTransaction, createTag, updateTransactionsFilters, filterType, bulkDeleteTransactions } from 'state/ducks/financial-forecast/actions';
import { Tag } from 'models/Tag';
import TransactionFieldsMetadata from 'models/TransactionFieldsMetadata';
import validateTransactionData from './validateTransactionData';
import ImportTransactionsModal from './ImportTransactionsModal';
import BulkUpdateModal from './BulkUpdateModal';

import TransactionsTable from './TransactionsTable';
import ButtonWithConfirmation from 'views/components/ButtonWithConfirmation';

const TableActions = styled.div`
  background-color: $white;
  margin-bottom:10px;

  button{
    margin: 0px 10px 0px 0px;
  }
`;

type Props = {
  transactions: TransactionDataInterface[],
  addNewTransaction: any
  bulkAddTransactions: any,
  bulkDeleteTransactions: any,
  updateTransaction: any,
  deleteTransaction: any,
  clearTransactions: any,
  dragTransaction: any
  createTag: typeof createTag,
  tags: Tag[],
  updateTransactionsFilters: any
  filters: filterType[],
}

type State = {
  bulkUpdateModalOpened: boolean,
  importingModalOpened: boolean,
  importingData: object[],
}


export default class Transactions extends Component<Props, State> {

  static defaultProps = {
    transactions: [],
  }

  state: State = {
    bulkUpdateModalOpened: false,
    importingModalOpened: false,
    importingData: [],
  }

  fileInput: any;

  parseTransactionsToCsv = (transactions: TransactionDataInterface[]) => {
    return transactions.map(t => {
      return {
        ...t,
        tags: t.tags ? t.tags.map(tag => tag.id).join(',') : []
      }
    });
  }

  importTransactions = (event: any) => {
    const reader = new FileReader();
    const file = this.fileInput.files[0];

    reader.onerror = (err) => {
      console.log({ err });
    };
    reader.onload = (csv =>
      (e: any) => {
        let csvContent = csvJSON(e.target.result, TransactionFieldsMetadata);
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

  configureTransactionFromCSV = (transaction: any) =>
    ({
      ...transaction,
      tags: transaction.tags && transaction.tags.split(',').map((tagValue: string) => {
        const tag = this.props.tags.find(tag => tagValue === tag.id);
        if (tag) {
          return {
            ...tag
          };
        };

        // create a new tag if it does not exist in store
        const newOption = { label: tagValue, id: tagValue.toLowerCase() }
        this.props.createTag(newOption);

        return newOption;
      })
    })

  openBulkUpdateModal = () => {
    this.setState({
      bulkUpdateModalOpened: true
    });
  }

  closeBulkUpdateModal = () => {
    this.setState({
      bulkUpdateModalOpened: false
    });
  }

  bulkUpdate = (update: any) => {
    const { updateTransaction, transactions } = this.props;

    transactions
      .filter(transaction => transaction.selected)
      .forEach((transaction: TransactionDataInterface) => {
        Object.entries(update).forEach(([key, value]: [any, any]) => {
          if (transaction.id) {
            updateTransaction(transaction.id, value, key);
            updateTransaction(transaction.id, false, 'selected');
          }
        });
      });

    this.setState({
      bulkUpdateModalOpened: false
    });
  }

  render() {
    const {
      importingModalOpened,
      importingData,
      bulkUpdateModalOpened,
    } = this.state;

    const {
      addNewTransaction,
      clearTransactions,
      createTag,
      tags,
      updateTransactionsFilters,
      filters,
      transactions,
      bulkAddTransactions,
      updateTransaction,
      deleteTransaction,
      dragTransaction
    } = this.props;

    return (
      <Fragment>
        <TableActions>
          <Button outline color="secondary" size="sm" onClick={addNewTransaction}>
            <FontAwesomeIcon icon={faPlus} /> Add
          </Button>
          <CSVLink
            data={this.parseTransactionsToCsv(transactions)}
            filename={`transactions-${YYYYMMDD(new Date())}.csv`}
            headers={TransactionFieldsMetadata}
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
          <Button outline color="secondary" size="sm" onClick={this.openBulkUpdateModal}>
            <FontAwesomeIcon icon={faEdit} /> Bulk update
</Button>
          <ButtonWithConfirmation outline color="secondary" size="sm" onClick={this.props.bulkDeleteTransactions}>
            <FontAwesomeIcon icon={faTrash} /> Bulk delete
      </ButtonWithConfirmation>
          <ButtonWithConfirmation outline color="secondary" size="sm" onClick={clearTransactions}>
            <FontAwesomeIcon icon={faTrash} /> Clear all
      </ButtonWithConfirmation>

        </TableActions>

        <TransactionsTable
          transactions={transactions}

          filters={filters}
          updateTransactionsFilters={updateTransactionsFilters}

          tags={tags}
          createTag={createTag}
          updateTransaction={updateTransaction}
          removeTransaction={deleteTransaction}
          dragTransaction={dragTransaction}
        />

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

        <BulkUpdateModal
          opened={bulkUpdateModalOpened}
          save={this.bulkUpdate}
          close={this.closeBulkUpdateModal}
          tags={tags}
          createTag={createTag}
        />
      </Fragment>
    );
  }
}
