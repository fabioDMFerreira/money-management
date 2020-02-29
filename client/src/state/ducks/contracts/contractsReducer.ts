import { List } from 'immutable';
import { RecurringTransactionConfig } from 'models/RecurringTransaction';

import { ContractsActions } from './contractsActions';
import { CREATE_CONTRACT, REMOVE_CONTRACT, UPDATE_CONTRACT } from './contractsTypes';

export interface ContractsState {
  contracts: List<RecurringTransactionConfig>;
}

const initialState: ContractsState = {
  contracts: List<RecurringTransactionConfig>([]),
};

export default (state: ContractsState = initialState, action: ContractsActions): ContractsState => {
  switch (action.type) {
    case CREATE_CONTRACT: {
      return {
        ...state,
        contracts: state.contracts.push(action.payload),
      };
    }
    case UPDATE_CONTRACT: {
      const contractIndex = state.contracts.findIndex((contract: any) => contract.id === action.id);

      if (contractIndex < 0) {
        return state;
      }

      return {
        ...state,
        contracts: state.contracts.update(
          contractIndex,
          (contract: RecurringTransactionConfig) => ({
            ...contract,
            ...action.payload,
          }),
        ),
      };
    }
    case REMOVE_CONTRACT: {
      const contractIndex = state.contracts.findIndex((contract: any) => contract.id === action.id);

      if (contractIndex < 0) {
        return state;
      }

      return {
        ...state,
        contracts: state.contracts.remove(contractIndex),
      };
    }
    default: {
      return state;
    }
  }
};
