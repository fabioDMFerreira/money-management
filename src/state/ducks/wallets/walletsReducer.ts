
import { Wallet } from 'models/Wallet/Wallet';

import {
  CLEAR_WALLETS,
  CREATE_WALLET,
  REMOVE_WALLET,
  UPDATE_WALLET,
  WalletActions,
} from './walletsTypes';


export interface WalletsState {
  wallets: Wallet[];
}

export const initialState: WalletsState = {
  wallets: [],
};

export default (state: WalletsState = initialState, action: WalletActions): WalletsState => {
  switch (action.type) {
    case CREATE_WALLET: {
      return {
        ...state,
        wallets: [...state.wallets, action.payload],
      };
    }
    case UPDATE_WALLET: return {
      ...state,
      wallets: state.wallets.map((wallet) => {
        if (wallet.id === action.id) {
          return { ...wallet, ...action.payload };
        }
        return wallet;
      }),
    };
    case REMOVE_WALLET: return {
      ...state,
      wallets: state.wallets.filter(wallet => wallet && wallet.id !== action.id),
    };
    case CLEAR_WALLETS: return {
      ...state,
      wallets: [],
    };
    default: return state;
  }
};
