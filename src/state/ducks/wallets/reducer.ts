import { Wallet } from 'models/Wallet/Wallet';
import {
  WalletActions,
  CREATE_WALLET,
  UPDATE_WALLET,
  REMOVE_WALLET
} from "./types";
import { List } from "immutable";

export interface WalletsState {
  wallets: List<Wallet>
}

export const initialState: WalletsState = {
  wallets: List<Wallet>()
}

export default (state: WalletsState = initialState, action: WalletActions): WalletsState => {
  switch (action.type) {
    case CREATE_WALLET: return {
      ...state,
      wallets: state.wallets.push(action.payload)
    };
    case UPDATE_WALLET: return {
      ...state,
      wallets: state.wallets
        .update(
          state.wallets.findIndex(wallet => !!(wallet && wallet.id === action.id)),
          wallet => ({ ...wallet, ...action.payload })
        )
    };
    case REMOVE_WALLET: return {
      ...state,
      wallets: state.wallets.remove(state.wallets.findIndex(wallet => !!(wallet && wallet.id === action.id)))
    };
  }

  return state;
}
