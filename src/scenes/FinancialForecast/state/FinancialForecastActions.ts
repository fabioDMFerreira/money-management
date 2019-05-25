import { GlobalFiltersType } from '../containers/GlobalFilters/GlobalFiltersType';
import {
  ADD_NEW_TRANSACTION,
  BULK_ADD_TRANSACTIONS,
  UPDATE_TRANSACTION,
  DELETE_TRANSACTION,
  CLEAR_TRANSACTIONS,
  DRAG_TRANSACTION,
  CREATE_TAG,
  UPDATE_TRANSACTIONS_FILTERS,
  UPDATE_FORECAST,
  SET_ACTIVE_TAB,
  UPDATE_GLOBAL_FILTER,
  DELETE_TAG,
  UPDATE_TAG
} from "./FinancialForecastActionTypes";
import TransactionData from "../TransactionDataInterface";
import transactionEditableFields from '../transactionEditableFields';
import { TagType } from "../TagType";

type TransactionType = "TRANSACTIONS" | "ESTIMATES";

export interface ActionAddNewTransactionInterface {
  type: typeof ADD_NEW_TRANSACTION,
  key: TransactionType,
}

export const addNewTransaction = (key: TransactionType) => (): ActionAddNewTransactionInterface => ({
  type: ADD_NEW_TRANSACTION,
  key
});

export interface ActionBulkAddTransactionsInterface {
  transactions: TransactionData[],
  type: typeof BULK_ADD_TRANSACTIONS,
  key: TransactionType
}

export const bulkAddTransactions = (key: TransactionType) => (transactions: TransactionData[]): ActionBulkAddTransactionsInterface => ({
  type: BULK_ADD_TRANSACTIONS,
  transactions,
  key,
});

export interface ActionUpdateTransactionInterface {
  id: string,
  value: any,
  field: transactionEditableFields,
  type: typeof UPDATE_TRANSACTION,
  key: TransactionType
}

export const updateTransaction = (key: TransactionType) => (id: string, value: any, field: transactionEditableFields): ActionUpdateTransactionInterface => ({
  type: UPDATE_TRANSACTION,
  id,
  field,
  value,
  key,
})

export interface ActionDeleteTransactionInterface {
  type: typeof DELETE_TRANSACTION,
  id: string,
  key: TransactionType
}

export const deleteTransaction = (key: TransactionType) => (id: string): ActionDeleteTransactionInterface => ({
  type: DELETE_TRANSACTION,
  id,
  key
})

export interface ActionClearTransactionsInterface {
  type: typeof CLEAR_TRANSACTIONS,
  key: TransactionType
}

export const clearTransactions = (key: TransactionType) => (): ActionClearTransactionsInterface => ({
  type: CLEAR_TRANSACTIONS,
  key
})


export interface ActionDragTransactionInterface {
  type: typeof DRAG_TRANSACTION,
  startIndex: number,
  endIndex: number,
  key: TransactionType
}

export const dragTransaction = (key: TransactionType) => (startIndex: number, endIndex: number): ActionDragTransactionInterface => ({
  type: DRAG_TRANSACTION,
  startIndex,
  endIndex,
  key
})


export type filterType = {
  id: string,
  value: string,
}
export interface ActionUpdateTransactionsFiltersInterface {
  type: typeof UPDATE_TRANSACTIONS_FILTERS,
  filters: filterType[]
  key: TransactionType
}

export const updateTransactionsFilters =(key: TransactionType) =>  (filters: filterType[]): ActionUpdateTransactionsFiltersInterface => ({
  type: UPDATE_TRANSACTIONS_FILTERS,
  filters,
  key
})


export interface ActionCreateTagInterface {
  type: typeof CREATE_TAG,
  tag: TagType
}

export const createTag = (tag: TagType): ActionCreateTagInterface => ({
  type: CREATE_TAG,
  tag,
})


export type ForecastEditableFieldsType = 'initialValue' | 'startDate' | 'endDate';
export interface ActionUpdateForecastInterface {
  type: typeof UPDATE_FORECAST,
  keyName: ForecastEditableFieldsType,
  value: string
}

export const updateForecast = (keyName: ForecastEditableFieldsType, value: string): ActionUpdateForecastInterface => ({
  type: UPDATE_FORECAST,
  keyName,
  value,
})

export interface ActionSetActiveTabInterface {
  type: typeof SET_ACTIVE_TAB,
  value: string
}

export const setActiveTab = (value: string): ActionSetActiveTabInterface => ({
  type: SET_ACTIVE_TAB,
  value,
})

export interface ActionUpdateGlobalFilterInterface {
  type: typeof UPDATE_GLOBAL_FILTER,
  filterKey: keyof GlobalFiltersType
  value: any
}

export const updateGlobalFilter = (filterKey: keyof GlobalFiltersType, value: any): ActionUpdateGlobalFilterInterface => ({
  type: UPDATE_GLOBAL_FILTER,
  filterKey,
  value
})

export interface ActionDeleteTagInterface {
  type: typeof DELETE_TAG,
  tag: TagType,
}

export const deleteTag = (tag: TagType): ActionDeleteTagInterface => ({
  type: DELETE_TAG,
  tag
})


export interface ActionUpdateTagInterface {
  type: typeof UPDATE_TAG,
  tag: TagType,
  newTag: TagType,
}

export const updateTag = (tag: TagType, newTag: TagType): ActionUpdateTagInterface => ({
  type: UPDATE_TAG,
  tag,
  newTag
})

export type FinancialForecastActions = ActionAddNewTransactionInterface |
  ActionBulkAddTransactionsInterface |
  ActionUpdateTransactionInterface |
  ActionDeleteTransactionInterface |
  ActionClearTransactionsInterface |
  ActionDragTransactionInterface |
  ActionCreateTagInterface |

  ActionUpdateTransactionsFiltersInterface |
  ActionUpdateForecastInterface |
  ActionSetActiveTabInterface |
  ActionUpdateGlobalFilterInterface |

  ActionDeleteTagInterface |
  ActionUpdateTagInterface;
