import { RecurringTransactionConfig } from './../../../models/RecurringTransaction/RecurringTransaction';

export const getContracts = (state: any) =>
  state && state.contracts && state.contracts.contracts && state.contracts.contracts;

export const getContractById = (state: any, id: string): RecurringTransactionConfig | undefined =>
  state && state.contracts && state.contracts.contracts &&
  state.contracts.contracts.find((contract: RecurringTransactionConfig) => contract.id === id);
