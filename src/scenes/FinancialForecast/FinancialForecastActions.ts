import {
  ADD_NEW_TRANSACTION,
  BULK_ADD_TRANSACTIONS,
  UPDATE_TRANSACTION,
  DELETE_TRANSACTION,
  CLEAR_TRANSACTIONS,
  DRAG_TRANSACTION,
  CREATE_TAG,
  CHANGE_VISIBILITY_BY_FILTER,
  UPDATE_TRANSACTIONS_FILTERS,
  UPDATE_FORECAST
} from "./FinancialForecastActionTypes";
import TransactionData from "./TransactionDataInterface";
import transactionEditableFields from './transactionEditableFields';
import { TagType } from "./TagType";
import { instanceOf } from "prop-types";

export interface ActionAddNewTransactionInterface {
  type: typeof ADD_NEW_TRANSACTION
}

export const addNewTransaction = (): ActionAddNewTransactionInterface => ({
  type: ADD_NEW_TRANSACTION,
});

export interface ActionBulkAddTransactionsInterface {
  transactions: TransactionData[],
  type: typeof BULK_ADD_TRANSACTIONS,
}

export const bulkAddTransactions = (transactions: TransactionData[]): ActionBulkAddTransactionsInterface => ({
  type: BULK_ADD_TRANSACTIONS,
  transactions
});

export interface ActionUpdateTransactionInterface {
  id: string,
  value: any,
  field: transactionEditableFields,
  type: typeof UPDATE_TRANSACTION,
}

export const updateTransaction = (id: string, value: any, field: transactionEditableFields): ActionUpdateTransactionInterface => ({
  type: UPDATE_TRANSACTION,
  id,
  field,
  value
})

export interface ActionDeleteTransactionInterface {
  type: typeof DELETE_TRANSACTION,
  id: string
}

export const deleteTransaction = (id: string): ActionDeleteTransactionInterface => ({
  type: DELETE_TRANSACTION,
  id
})

export interface ActionClearTransactionsInterface {
  type: typeof CLEAR_TRANSACTIONS,
}

export const clearTransactions = (): ActionClearTransactionsInterface => ({
  type: CLEAR_TRANSACTIONS
})


export interface ActionDragTransactionInterface {
  type: typeof DRAG_TRANSACTION,
  startIndex: number,
  endIndex: number,
}

export const dragTransaction = (startIndex: number, endIndex: number): ActionDragTransactionInterface => ({
  type: DRAG_TRANSACTION,
  startIndex,
  endIndex,
})


export interface ActionCreateTagInterface {
  type: typeof CREATE_TAG,
  tag: TagType
}

export const createTag = (tag: TagType): ActionCreateTagInterface => ({
  type: CREATE_TAG,
  tag,
})

export interface ActionChangeVisibilityByFilterInterface {
  type: typeof CHANGE_VISIBILITY_BY_FILTER,
  filter: string | string[],
  value: string | string[],
}

export const changeTransactionsVisibilityByFilter = (filter: string | string[], value: string | string[]): ActionChangeVisibilityByFilterInterface => {
  if (typeof filter === 'string' && typeof value === 'string') {
    return {
      type: CHANGE_VISIBILITY_BY_FILTER,
      filter,
      value: value.toLowerCase()
    };
  } else if (filter instanceof Array && value instanceof Array && filter.length === value.length) {
    return {
      type: CHANGE_VISIBILITY_BY_FILTER,
      filter,
      value: value.map(value => value.toLowerCase())
    };
  }

  return {
    type: CHANGE_VISIBILITY_BY_FILTER,
    filter: '',
    value: ''
  }
}

export type filterType = {
  id: string,
  value: string,
}
export interface ActionUpdateTransactionsFiltersInterface {
  type: typeof UPDATE_TRANSACTIONS_FILTERS,
  filters: filterType[]
}

export const updateTransactionsFilters = (filters: filterType[]): ActionUpdateTransactionsFiltersInterface => ({
  type: UPDATE_TRANSACTIONS_FILTERS,
  filters
})

export type ForecastEditableFieldsType = 'initialValue' | 'startDate' | 'endDate';
export interface ActionUpdateForecastInterface {
  type: typeof UPDATE_FORECAST,
  keyName: ForecastEditableFieldsType,
  value: string
}

export const updateForecast = (keyName: ForecastEditableFieldsType, value: string) => ({
  type: UPDATE_FORECAST,
  keyName,
  value,
})

export type FinancialForecastActions = ActionAddNewTransactionInterface |
  ActionBulkAddTransactionsInterface |
  ActionUpdateTransactionInterface |
  ActionDeleteTransactionInterface |
  ActionClearTransactionsInterface |
  ActionDragTransactionInterface |
  ActionCreateTagInterface |
  ActionChangeVisibilityByFilterInterface |
  ActionUpdateTransactionsFiltersInterface |
  ActionUpdateForecastInterface;
