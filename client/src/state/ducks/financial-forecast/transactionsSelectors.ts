import { TransactionConfig } from 'models/Transaction/TransactionConfig';

export const getTransactionsSelector = (state: any) =>
  (state.financialForecast && state.financialForecast.transactions) || [];

export const getEstimatesSelector = (state: any) =>
  (state.financialForecast && state.financialForecast.estimates) || [];

export const getTransactionByIdSelector = (state: any, id: string) =>
  state.financialForecast &&
  state.financialForecast.transactions &&
  state.financialForecast.transactions
    .find((transaction: any) => transaction.id === id);

export const getAllExternalTransactions = (state: any) =>
  (state.financialForecast &&
    state.financialForecast.allTransactions &&
    state.financialForecast.allTransactions
      .filter((transaction: TransactionConfig) => !transaction.isInternalTransaction)
  )
  ||
  [];

export const getExternalTransactions = (state: any) =>
  (state.financialForecast &&
    state.financialForecast.transactions &&
    state.financialForecast.transactions
      .filter((transaction: TransactionConfig) => !transaction.isInternalTransaction)
  )
  ||
  [];
