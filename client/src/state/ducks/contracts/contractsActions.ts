import { RecurringTransactionConfig } from 'models/RecurringTransaction';

import { CREATE_CONTRACT, REMOVE_CONTRACT, UPDATE_CONTRACT } from './contractsTypes';


interface CreateContractAction {
  type: typeof CREATE_CONTRACT;
  payload: RecurringTransactionConfig;
}

interface UpdateContractAction {
  type: typeof UPDATE_CONTRACT;
  id: string;
  payload: RecurringTransactionConfig;
}

interface RemoveContractAction {
  type: typeof REMOVE_CONTRACT;
  id: string;
}

export const createContract = (rT: RecurringTransactionConfig): CreateContractAction => ({
  type: CREATE_CONTRACT,
  payload: rT,
});

export const updateContract = (id: string, rT: RecurringTransactionConfig): UpdateContractAction => ({
  type: UPDATE_CONTRACT,
  payload: rT,
  id,
});

export const removeContract = (id: string): RemoveContractAction => ({
  type: REMOVE_CONTRACT,
  id,
});

export type ContractsActions = CreateContractAction | UpdateContractAction | RemoveContractAction;
