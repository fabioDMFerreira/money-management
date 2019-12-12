
import { List } from 'immutable';
import { Wallet } from 'models/Wallet/Wallet';

import {
  CLEAR_WALLETS,
  CREATE_WALLET,
  REMOVE_WALLET,
  UPDATE_WALLET,
  WalletActions,
} from './types';


export interface WalletsState {
  wallets: List<Wallet>;
}

export const initialState: WalletsState = {
  wallets: List<Wallet>(),
};

export default (state: WalletsState = initialState, action: WalletActions): WalletsState => {
  switch (action.type) {
    case CREATE_WALLET: return {
      ...state,
      wallets: state.wallets.push(action.payload),
    };
    case UPDATE_WALLET: return {
      ...state,
      wallets: state.wallets
        .update(
          state.wallets.findIndex(wallet => !!(wallet && wallet.id === action.id)),
          wallet => ({ ...wallet, ...action.payload }),
        ),
    };
    case REMOVE_WALLET: return {
      ...state,
      wallets: state.wallets.remove(state.wallets.findIndex(wallet => !!(wallet && wallet.id === action.id))),
    };
    case CLEAR_WALLETS: return {
      ...state,
      wallets: List<Wallet>(),
    };
    default: return state;
  }
};
