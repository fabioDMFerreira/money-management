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
import randomColor from 'randomcolor';

import YYYYMMDD from 'utils/YYYYMMDD';
import csvJSON from 'utils/csvJSON';

import TransactionConfig from 'models/Transaction/TransactionConfig';
import { addNewTransaction, bulkAddTransactions, updateTransaction, deleteTransaction, clearTransactions, dragTransaction, updateTransactionsFilters, filterType, bulkDeleteTransactions, } from 'state/ducks/financial-forecast/actions';
import { Tag } from 'models/Tag';
import TransactionFieldsMetadata from 'models/Transaction/TransactionFieldsMetadata';
import validateTransactionData from './validateTransactionData';
import ImportTransactionsModal from './ImportTransactionsModal';
import BulkUpdateModal from './BulkUpdateModal';

import TransactionsTable from './TransactionsTable';
import ButtonWithConfirmation from 'views/components/ButtonWithConfirmation';
import { createWallet } from 'state/ducks/wallets';
import { Wallet } from 'models/Wallet';
import { Map } from 'immutable';
import AddRecurringTransaction from 'views/containers/AddRecurringTransaction';
import getRandomString from 'utils/getRandomString';

const TableActions = styled.div`
  background-color: $white;
  margin-bottom:10px;

  button{
    margin: 0px 10px 0px 0px;
  }
`;

type Props = {
  transactions: TransactionConfig[],
  addNewTransaction: any
  bulkAddTransactions: any,
  bulkDeleteTransactions: any,
  updateTransaction: any,
  deleteTransaction: any,
  clearTransactions: any,
  dragTransaction: any
  createTag: any,
  createWallet: typeof createWallet,
  tags: Tag[],
  wallets: Wallet[],
  updateTransactionsFilters: any
  filters: filterType[],
  selectedTransactions: { [key: string]: boolean },
  selectTransaction: any,
  unselectTransaction: any,
  selectAllTransactions: any,
  unselectAllTransactions: any,
  enableRecurringTransactions?: boolean,
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

  parseTransactionsToCsv = (transactions: TransactionConfig[]) => {
    return transactions.map(t => {
      const wallet = t.wallet && this.props.wallets.find(wallet => wallet.id === t.wallet);
      const tags = t.tags && t.tags.map(tag => this.props.tags.find(t => t.id === tag));
      return {
        ...t,
        tags: tags ? escape(JSON.stringify(tags)) : "",
        wallet: wallet ? escape(JSON.stringify(wallet)) : ""
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
      tags: transaction.tags && JSON.parse(unescape(transaction.tags)).map((tagValue: Tag) => {
        const tag = this.props.tags.find(tag => tagValue.id === tag.id);
        if (tag) {
          return tag.id;
        };

        // create a new tag if it does not exist in store
        // const newOption = { label: tagValue, id: tagValue.toLowerCase() }
        this.props.createTag(tagValue);

        return tagValue.id;
      }),
      wallet: transaction.wallet && (() => {
        let fileWallet = JSON.parse(unescape(transaction.wallet));
        const wallet = this.props.wallets.find(wallet => wallet.name === fileWallet.name);

        if (wallet) {
          return wallet.id;
        } else {
          this.props.createWallet(fileWallet);
          return fileWallet.id;
        }

        const newWallet = {
          id: getRandomString(),
          balance: 0,
          name: transaction.wallet,
          color: randomColor(),
        };

        this.props.createWallet(newWallet);

        return newWallet.id;
      })()
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
    const { updateTransaction, transactions, unselectTransaction } = this.props;

    transactions
      .filter((transaction: TransactionConfig) => transaction.id && this.props.selectedTransactions[transaction.id])
      .forEach((transaction: TransactionConfig) => {
        Object.entries(update).forEach(([key, value]: [any, any]) => {
          if (transaction.id) {
            updateTransaction(transaction.id, value, key);
            unselectTransaction(transaction.id);
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
      transactions,
      bulkAddTransactions,
      filters,
      deleteTransaction,
      selectTransaction,
      unselectTransaction,
      selectAllTransactions,
      unselectAllTransactions,
      selectedTransactions,
      updateTransaction,
    } = this.props;

    const someSelected = Object.values(selectedTransactions).some((v) => v);

    return (
      <Fragment>
        <TableActions>
          <Button outline color="secondary" size="sm" onClick={addNewTransaction}>
            <FontAwesomeIcon icon={faPlus} /> Add
          </Button>
          {
            this.props.enableRecurringTransactions &&
            <AddRecurringTransaction />
          }
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
          {
            someSelected &&
            <Fragment>
              <Button outline color="secondary" size="sm" onClick={this.openBulkUpdateModal}>
                <FontAwesomeIcon icon={faEdit} /> Bulk update
</Button>
              <ButtonWithConfirmation outline color="secondary" size="sm" onClick={this.props.bulkDeleteTransactions}>
                <FontAwesomeIcon icon={faTrash} /> Bulk delete
      </ButtonWithConfirmation>
            </Fragment>
          }
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

          selected={selectedTransactions}
          select={selectTransaction}
          selectAll={selectAllTransactions}
          unselect={unselectTransaction}
          unselectAll={unselectAllTransactions}
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
