import { RecurringTransactionConfig } from './../../../models/RecurringTransaction/RecurringTransaction';

export const getContracts = (state: any) =>
  state && state.contracts && state.contracts.contracts && state.contracts.contracts.toJS();

export const getContractById = (state: any, id: string): RecurringTransactionConfig | undefined =>
  state && state.contracts && state.contracts.contracts &&
  state.contracts.contracts.toJS().find((contract: RecurringTransactionConfig) => contract.id === id);
