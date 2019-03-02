import {
  ADD_NEW_TRANSACTION,
  BULK_ADD_TRANSACTIONS,
  UPDATE_TRANSACTION,
  DELETE_TRANSACTION,
  CLEAR_TRANSACTIONS,
  DRAG_TRANSACTION
} from "./FinancialForecastActionTypes";
import TransactionData from "./TransactionDataInterface";
import transactionEditableFields from './transactionEditableFields';

export interface IActionAddNewTransaction {
  type: typeof ADD_NEW_TRANSACTION
}

export const addNewTransaction = (): IActionAddNewTransaction => ({
  type: ADD_NEW_TRANSACTION,
});

export interface IActionBulkAddTransactions {
  transactions: TransactionData[],
  type: typeof BULK_ADD_TRANSACTIONS,
}

export const bulkAddTransactions = (transactions: TransactionData[]): IActionBulkAddTransactions => ({
  type: BULK_ADD_TRANSACTIONS,
  transactions
});

export interface IActionUpdateTransaction {
  id: string,
  value: any,
  field: transactionEditableFields,
  type: typeof UPDATE_TRANSACTION,
}

export const updateTransaction = (id: string, value: any, field: transactionEditableFields): IActionUpdateTransaction => ({
  type: UPDATE_TRANSACTION,
  id,
  field,
  value
})

export interface IActionDeleteTransaction {
  type: typeof DELETE_TRANSACTION,
  id: string
}

export const deleteTransaction = (id: string): IActionDeleteTransaction => ({
  type: DELETE_TRANSACTION,
  id
})

export interface IActionClearTransactions {
  type: typeof CLEAR_TRANSACTIONS,
}

export const clearTransactions = (): IActionClearTransactions => ({
  type: CLEAR_TRANSACTIONS
})


export interface IActionDragTransaction {
  type: typeof DRAG_TRANSACTION,
  startIndex: number,
  endIndex: number,
}

export const dragTransaction = (startIndex: number, endIndex: number): IActionDragTransaction => ({
  type: DRAG_TRANSACTION,
  startIndex,
  endIndex,
})

export type FinancialForecastActions = IActionAddNewTransaction | IActionBulkAddTransactions | IActionUpdateTransaction | IActionDeleteTransaction | IActionClearTransactions | IActionDragTransaction;
