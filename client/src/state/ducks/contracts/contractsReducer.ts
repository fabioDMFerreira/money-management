import { RecurringTransactionConfig } from 'models/RecurringTransaction';

import { ContractsActions } from './contractsActions';
import { CREATE_CONTRACT, REMOVE_CONTRACT, UPDATE_CONTRACT } from './contractsTypes';

export interface ContractsState {
  contracts: RecurringTransactionConfig[];
}

const initialState: ContractsState = {
  contracts: [],
};

export default (state: ContractsState = initialState, action: ContractsActions): ContractsState => {
  switch (action.type) {
    case CREATE_CONTRACT: {
      return {
        ...state,
        contracts: [...state.contracts, action.payload],
      };
    }
    case UPDATE_CONTRACT: {
      const contractIndex = state.contracts.map(contract => contract.id).indexOf(action.id);

      if (contractIndex < 0) {
        return state;
      }

      const contracts = [
        ...state.contracts.slice(0, contractIndex),
        {
          ...state.contracts[contractIndex],
          ...action.payload,
        },
        ...state.contracts.slice(contractIndex + 1),
      ];

      return {
        ...state,
        contracts,
      };
    }
    case REMOVE_CONTRACT: {
      const contractIndex = state.contracts.map(contract => contract.id).indexOf(action.id);

      if (contractIndex < 0) {
        return state;
      }

      const contracts = [
        ...state.contracts.slice(0, contractIndex),
        ...state.contracts.slice(contractIndex + 1),
      ];

      return {
        ...state,
        contracts,
      };
    }
    default: {
      return state;
    }
  }
};
