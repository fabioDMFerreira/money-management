import { GlobalFilters } from 'models/GlobalFilters';
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
  UPDATE_TAG,
  BULK_DELETE_TRANSACTIONS,
  UPDATE_TAGS_VIEW,
  CLEAR_TAGS
} from "./types";
import TransactionData from "models/Transaction/TransactionConfig";
import transactionEditableFields from 'models/Transaction/TransactionEditableFields';
import { Tag } from "models/Tag";

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

export interface ActionBulkDeleteTransactionsInterface {
  type: typeof BULK_DELETE_TRANSACTIONS,
  key: TransactionType
}

export const bulkAddTransactions = (key: TransactionType) => (transactions: TransactionData[]): ActionBulkAddTransactionsInterface => ({
  type: BULK_ADD_TRANSACTIONS,
  transactions,
  key,
});

export const bulkDeleteTransactions = (key: TransactionType) => (): ActionBulkDeleteTransactionsInterface => ({
  type: BULK_DELETE_TRANSACTIONS,
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

export const updateTransactionsFilters = (key: TransactionType) => (filters: filterType[]): ActionUpdateTransactionsFiltersInterface => ({
  type: UPDATE_TRANSACTIONS_FILTERS,
  filters,
  key
})


export interface ActionCreateTagInterface {
  type: typeof CREATE_TAG,
  tag: Tag
}

export const createTag = (tag: Tag): ActionCreateTagInterface => ({
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
  filterKey: keyof GlobalFilters
  value: any
}

export const updateGlobalFilter = (filterKey: keyof GlobalFilters, value: any): ActionUpdateGlobalFilterInterface => ({
  type: UPDATE_GLOBAL_FILTER,
  filterKey,
  value
})

export interface ActionDeleteTagInterface {
  type: typeof DELETE_TAG,
  tag: Tag,
}

export const deleteTag = (tag: Tag): ActionDeleteTagInterface => ({
  type: DELETE_TAG,
  tag
})


export interface ActionUpdateTagInterface {
  type: typeof UPDATE_TAG,
  tag: Tag,
  newTag: Tag,
}

export const updateTag = (tag: Tag, newTag: Tag): ActionUpdateTagInterface => ({
  type: UPDATE_TAG,
  tag,
  newTag
})

export type TagsView = 'chart' | 'table';

export interface ActionUpdateTagsView {
  type: typeof UPDATE_TAGS_VIEW,
  payload: TagsView,
}

export const updateTagsView = (payload: TagsView): ActionUpdateTagsView => {
  return {
    type: UPDATE_TAGS_VIEW,
    payload,
  }
}

interface ActionClearTags {
  type: typeof CLEAR_TAGS
}

export const clearTags = (): ActionClearTags => ({
  type: CLEAR_TAGS
});

export type FinancialForecastActions = ActionAddNewTransactionInterface |
  ActionBulkAddTransactionsInterface |
  ActionBulkDeleteTransactionsInterface |
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
  ActionUpdateTagInterface |
  ActionUpdateTagsView |
  ActionClearTags;
