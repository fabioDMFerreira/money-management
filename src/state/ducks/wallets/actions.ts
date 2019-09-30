import { Wallet } from 'models/Wallet/Wallet';
import {
  WalletConfig,
  WalletActions,
  CREATE_WALLET,
  UPDATE_WALLET,
  REMOVE_WALLET
} from "./types";

export const createWallet = (payload: Wallet): WalletActions => {
  return {
    type: CREATE_WALLET,
    payload
  };
}

export const updateWallet = (id: string, payload: WalletConfig): WalletActions => {
  return {
    type: UPDATE_WALLET,
    id,
    payload
  }
}

export const removeWallet = (id: string): WalletActions => {
  return {
    type: REMOVE_WALLET,
    id
  }
}
