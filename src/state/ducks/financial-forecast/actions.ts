import { GlobalFilters } from 'models/GlobalFilters';
import { TransactionConfig } from 'models/Transaction/TransactionConfig';
import { transactionEditableFields } from 'models/Transaction/TransactionEditableFields';

import {
  ADD_NEW_TRANSACTION,
  BULK_ADD_TRANSACTIONS,
  BULK_DELETE_TRANSACTIONS,
  CLEAR_TRANSACTIONS,
  DELETE_TRANSACTION,
  DRAG_TRANSACTION,
  SELECT_ALL_TRANSACTIONS,
  SELECT_TRANSACTION,
  SET_ACTIVE_TAB,
  UNSELECT_ALL_TRANSACTIONS,
  UNSELECT_TRANSACTION,
  UPDATE_FORECAST,
  UPDATE_GLOBAL_FILTER,
  UPDATE_TRANSACTION,
  UPDATE_TRANSACTIONS_FILTERS,
} from './types';

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


export type ForecastEditableFieldsType = 'initialValue' | 'startDate' | 'endDate';
export interface ActionUpdateForecastInterface {
  type: typeof UPDATE_FORECAST;
  keyName: ForecastEditableFieldsType;
  value: string;
}

export const updateForecast = (keyName: ForecastEditableFieldsType, value: string): ActionUpdateForecastInterface => ({
  type: UPDATE_FORECAST,
  keyName,
  value,
});

export interface ActionSetActiveTabInterface {
  type: typeof SET_ACTIVE_TAB;
  value: string;
}

export const setActiveTab = (value: string): ActionSetActiveTabInterface => ({
  type: SET_ACTIVE_TAB,
  value,
});

export interface ActionUpdateGlobalFilterInterface {
  type: typeof UPDATE_GLOBAL_FILTER;
  filterKey: keyof GlobalFilters;
  value: any;
}

export const updateGlobalFilter = (filterKey: keyof GlobalFilters, value: any): ActionUpdateGlobalFilterInterface => ({
  type: UPDATE_GLOBAL_FILTER,
  filterKey,
  value,
});

export type FinancialForecastActions =
  ActionAddNewTransactionInterface |
  ActionBulkAddTransactionsInterface |
  ActionBulkDeleteTransactionsInterface |
  ActionUpdateTransactionInterface |
  ActionDeleteTransactionInterface |
  ActionClearTransactionsInterface |
  ActionDragTransactionInterface |
  ActionSelectTransactionInterface |
  ActionSelectAllTransactionInterface |
  ActionUnselectTransactionInterface |
  ActionUnselectAllTransactionsInterface |

  ActionUpdateTransactionsFiltersInterface |
  ActionUpdateForecastInterface |
  ActionSetActiveTabInterface |
  ActionUpdateGlobalFilterInterface;
