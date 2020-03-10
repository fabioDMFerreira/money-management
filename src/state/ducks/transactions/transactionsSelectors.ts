import { TransactionConfig } from 'models/Transaction/TransactionConfig';

export const getTransactionsFiltersSelector = (state: any) =>
  (state.transactions && state.transactions.filters) || {};

export const getTransactionsSelectedSelector = (state: any) =>
  (state.transactions && state.transactions.selected) || {};


export const getTransactionsSelector = (state: any) =>
  (state.transactions && state.transactions.transactions) || [];

export const getAllTransactionsSelector = (state: any) =>
  (state.transactions && state.transactions.allTransactions) || [];


export const getTransactionByIdSelector = (state: any, id: string) =>
  state.transactions &&
  state.transactions.transactions &&
  state.transactions.transactions
    .find((transaction: any) => transaction.id === id);

export const getAllExternalTransactions = (state: any) =>
  (state.transactions &&
    state.transactions.allTransactions &&
    state.transactions.allTransactions
      .filter((transaction: TransactionConfig) => !transaction.isInternalTransaction)
  )
  ||
  [];

export const getExternalTransactions = (state: any) =>
  (state.transactions &&
    state.transactions.transactions &&
    state.transactions.transactions
      .filter((transaction: TransactionConfig) => !transaction.isInternalTransaction)
  )
  ||
  [];
