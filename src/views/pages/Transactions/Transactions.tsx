import {
  faEdit,
  faPlus,
  faTrash,
  faUpload,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Tag } from 'models/Tag';
import { TransactionConfig } from 'models/Transaction/TransactionConfig';
import TransactionFieldsMetadata from 'models/Transaction/TransactionFieldsMetadata';
import { Wallet } from 'models/Wallet';
import React, { Component, Fragment } from 'react';
import { CSVLink } from 'react-csv';
import Button from 'reactstrap/lib/Button';
import { createWallet } from 'state/ducks/wallets';
import { dragTransaction, filterType, updateTransactionsFilters } from 'state/reducerFactory/transactionsReducerFactory/transactionsActionsFactory';
import styled from 'styled-components';
import YYYYMMDD from 'utils/dateUtils/YYYYMMDD';
import ButtonWithConfirmation from 'views/components/ButtonWithConfirmation';

import TransactionsTable from '../../containers/TransactionsTable';
import BulkUpdateModal from './components/BulkUpdateModal';
import ImportTransactions from './components/ImportTransactions';

const TableActions = styled.div`
  background-color: $white;
  margin-bottom:10px;

  button{
    margin: 0px 10px 0px 0px;
  }
`;

type Props = {
  transactions: TransactionConfig[];
  addNewTransaction: any;
  bulkAddTransactions: any;
  bulkDeleteTransactions: any;
  updateTransaction: any;
  deleteTransaction: any;
  clearTransactions: any;
  dragTransaction: any;
  createTag: any;
  createWallet: typeof createWallet;
  tags: Tag[];
  wallets: Wallet[];
  updateTransactionsFilters: any;
  filters: filterType[];
  selectedTransactions: { [key: string]: boolean };
  selectTransaction: any;
  unselectTransaction: any;
  selectAllTransactions: any;
  unselectAllTransactions: any;
  enableRecurringTransactions?: boolean;
}

type State = {
  bulkUpdateModalOpened: boolean;
}

export default class Transactions extends Component<Props, State> {
  static defaultProps = {
    transactions: [],
  }

  state: State = {
    bulkUpdateModalOpened: false,
  }

  fileInput: any;

  parseTransactionsToCsv = (transactions: TransactionConfig[]) => transactions.map((t) => {
    const wallet = t.wallet && this.props.wallets.find(wallet => wallet.id === t.wallet);
    const tags = t.tags && t.tags.map(tag => this.props.tags.find(t => t.id === tag));
    return {
      ...t,
      tags: tags ? escape(JSON.stringify(tags)) : '',
      wallet: wallet ? escape(JSON.stringify(wallet)) : '',
    };
  })

  configureTransactionFromCSV = (transaction: any) => ({
    ...transaction,
    isInternalTransaction: transaction.isInternalTransaction === 'true',
    tags: transaction.tags && JSON.parse(unescape(transaction.tags)).map((tagValue: Tag) => {
      const tag = this.props.tags.find(tag => tagValue.id === tag.id);
      if (tag) {
        return tag.id;
      }

      // create a new tag if it does not exist in store
      this.props.createTag(tagValue);

      return tagValue.id;
    }),
    wallet: transaction.wallet && (() => {
      try {
        const fileWallet = JSON.parse(unescape(transaction.wallet));
        const wallet = this.props.wallets.find(wallet => wallet.name === fileWallet.name);

        if (wallet) {
          return wallet.id;
        }
        this.props.createWallet(fileWallet);
        return fileWallet.id;
      } catch (e) {
        return transaction.wallet;
      }
    })(),
  })

  openBulkUpdateModal = () => {
    this.setState({
      bulkUpdateModalOpened: true,
    });
  }

  closeBulkUpdateModal = () => {
    this.setState({
      bulkUpdateModalOpened: false,
    });
  }

  importTransactions = (fileContent: object[]) => {
    const transactions = fileContent.map(this.configureTransactionFromCSV);

    this.props.bulkAddTransactions(transactions);
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
      bulkUpdateModalOpened: false,
    });
  }

  render() {
    const {
      bulkUpdateModalOpened,
    } = this.state;

    const {
      addNewTransaction,
      clearTransactions,
      createTag,
      tags,
      transactions,
      filters,
      deleteTransaction,
      selectTransaction,
      unselectTransaction,
      selectAllTransactions,
      unselectAllTransactions,
      selectedTransactions,
      updateTransaction,
      wallets,
      createWallet,
    } = this.props;

    const someSelected = Object.values(selectedTransactions).some(v => v);

    return (
      <Fragment>
        <TableActions>
          <Button outline color="secondary" size="sm" onClick={addNewTransaction}>
            <FontAwesomeIcon icon={faPlus} /> Add
          </Button>
          {/* {
            this.props.enableRecurringTransactions &&
            <AddRecurringTransaction recurringTransactionType="contract" />
          } */}
          <CSVLink
            data={this.parseTransactionsToCsv(transactions)}
            filename={`transactions-${YYYYMMDD(new Date())}.csv`}
            headers={TransactionFieldsMetadata}
          >
            <Button outline color="secondary" size="sm">
              <FontAwesomeIcon icon={faUpload} /> Export
            </Button>
          </CSVLink>
          <ImportTransactions
            save={this.importTransactions}
            wallets={this.props.wallets}
            createWallet={this.props.createWallet}
          />
          <ButtonWithConfirmation outline color="secondary" size="sm" onClick={clearTransactions}>
            <FontAwesomeIcon icon={faTrash} /> Clear all
          </ButtonWithConfirmation>
          {
            someSelected
            && (
              <Fragment>
                <Button color="secondary" size="sm" onClick={this.openBulkUpdateModal}>
                  <FontAwesomeIcon icon={faEdit} /> Bulk update
                </Button>
                <ButtonWithConfirmation color="secondary" size="sm" onClick={this.props.bulkDeleteTransactions}>
                  <FontAwesomeIcon icon={faTrash} /> Bulk delete
                </ButtonWithConfirmation>
              </Fragment>
            )
          }

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

        <BulkUpdateModal
          opened={bulkUpdateModalOpened}
          save={this.bulkUpdate}
          close={this.closeBulkUpdateModal}
          tags={tags}
          createTag={createTag}
          wallets={wallets}
          createWallet={createWallet}
        />
      </Fragment>
    );
  }
}
