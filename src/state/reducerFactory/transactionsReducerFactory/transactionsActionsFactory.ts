import { TransactionConfig } from 'models/Transaction/TransactionConfig';
import { transactionEditableFields } from 'models/Transaction/TransactionEditableFields';

import {
  ADD_NEW_TRANSACTION,
  BULK_ADD_TRANSACTIONS,
  BULK_DELETE_TRANSACTIONS,
  BULK_DELETE_TRANSACTIONS_BY_ID,
  CLEAR_TRANSACTIONS,
  DELETE_TRANSACTION,
  DRAG_TRANSACTION,
  SELECT_ALL_TRANSACTIONS,
  SELECT_TRANSACTION,
  UNSELECT_ALL_TRANSACTIONS,
  UNSELECT_TRANSACTION,
  UPDATE_TRANSACTION,
  UPDATE_TRANSACTIONS_FILTERS,
} from './transactionsTypes';

type TransactionType = 'TRANSACTIONS' | 'ESTIMATES';

export interface ActionAddNewTransactionInterface {
  type: typeof ADD_NEW_TRANSACTION;
  key: TransactionType;
}

export const addNewTransaction = (key: TransactionType) => (): ActionAddNewTransactionInterface => ({
  type: ADD_NEW_TRANSACTION,
  key,
});

export interface ActionBulkAddTransactionsInterface {
  transactions: TransactionConfig[];
  type: typeof BULK_ADD_TRANSACTIONS;
  key: TransactionType;
}

export interface ActionBulkDeleteTransactionsInterface {
  type: typeof BULK_DELETE_TRANSACTIONS;
  key: TransactionType;
}

export const bulkAddTransactions = (key: TransactionType) => (transactions: TransactionConfig[]): ActionBulkAddTransactionsInterface => ({
  type: BULK_ADD_TRANSACTIONS,
  transactions,
  key,
});

export const bulkDeleteTransactions = (key: TransactionType) => (): ActionBulkDeleteTransactionsInterface => ({
  type: BULK_DELETE_TRANSACTIONS,
  key,
});

export interface ActionBulkDeleteTransactionsByIdInterface {
  type: typeof BULK_DELETE_TRANSACTIONS_BY_ID;
  key: TransactionType;
  ids: string[];
}

export const bulkDeleteTransactionsById = (key: TransactionType) => (ids: string[]): ActionBulkDeleteTransactionsByIdInterface => ({
  type: BULK_DELETE_TRANSACTIONS_BY_ID,
  key,
  ids,
});

export interface ActionUpdateTransactionInterface {
  id: string;
  value: any;
  field: transactionEditableFields;
  type: typeof UPDATE_TRANSACTION;
  key: TransactionType;
}

export const updateTransaction =
  (key: TransactionType) => (id: string, value: any, field: transactionEditableFields): ActionUpdateTransactionInterface => ({
    type: UPDATE_TRANSACTION,
    id,
    field,
    value,
    key,
  });

export interface ActionDeleteTransactionInterface {
  type: typeof DELETE_TRANSACTION;
  id: string;
  key: TransactionType;
}

export const deleteTransaction = (key: TransactionType) => (id: string): ActionDeleteTransactionInterface => ({
  type: DELETE_TRANSACTION,
  id,
  key,
});

export interface ActionClearTransactionsInterface {
  type: typeof CLEAR_TRANSACTIONS;
  key: TransactionType;
}

export const clearTransactions = (key: TransactionType) => (): ActionClearTransactionsInterface => ({
  type: CLEAR_TRANSACTIONS,
  key,
});


export interface ActionDragTransactionInterface {
  type: typeof DRAG_TRANSACTION;
  startIndex: number;
  endIndex: number;
  key: TransactionType;
}

export const dragTransaction = (key: TransactionType) => (startIndex: number, endIndex: number): ActionDragTransactionInterface => ({
  type: DRAG_TRANSACTION,
  startIndex,
  endIndex,
  key,
});

export interface ActionSelectTransactionInterface {
  type: typeof SELECT_TRANSACTION;
  id: string;
  key: string;
}

export const selectTransaction = (key: TransactionType) => (id: string): ActionSelectTransactionInterface => ({
  type: SELECT_TRANSACTION,
  id,
  key,
});

export interface ActionUnselectTransactionInterface {
  type: typeof UNSELECT_TRANSACTION;
  id: string;
  key: string;
}

export const unselectTransaction = (key: TransactionType) => (id: string): ActionUnselectTransactionInterface => ({
  type: UNSELECT_TRANSACTION,
  id,
  key,
});

export interface ActionSelectAllTransactionInterface {
  type: typeof SELECT_ALL_TRANSACTIONS;
  key: string;
}

export const selectAllTransactions = (key: TransactionType) => (): ActionSelectAllTransactionInterface => ({
  type: SELECT_ALL_TRANSACTIONS,
  key,
});

export interface ActionUnselectAllTransactionsInterface {
  type: typeof UNSELECT_ALL_TRANSACTIONS;
  key: string;
}

export const unselectAllTransactions = (key: TransactionType) => (): ActionUnselectAllTransactionsInterface => ({
  type: UNSELECT_ALL_TRANSACTIONS,
  key,
});

export type filterType = {
  id: string;
  value: string;
}
export interface ActionUpdateTransactionsFiltersInterface {
  type: typeof UPDATE_TRANSACTIONS_FILTERS;
  filters: filterType[];
  key: TransactionType;
}

export const updateTransactionsFilters = (key: TransactionType) => (filters: filterType[]): ActionUpdateTransactionsFiltersInterface => ({
  type: UPDATE_TRANSACTIONS_FILTERS,
  filters,
  key,
});


export type FinancialForecastActions =
  ActionAddNewTransactionInterface |
  ActionBulkAddTransactionsInterface |
  ActionBulkDeleteTransactionsInterface |
  ActionBulkDeleteTransactionsByIdInterface |
  ActionUpdateTransactionInterface |
  ActionDeleteTransactionInterface |
  ActionClearTransactionsInterface |
  ActionDragTransactionInterface |
  ActionSelectTransactionInterface |
  ActionSelectAllTransactionInterface |
  ActionUnselectTransactionInterface |
  ActionUnselectAllTransactionsInterface |
  ActionUpdateTransactionsFiltersInterface;
