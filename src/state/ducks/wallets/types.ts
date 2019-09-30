import { Wallet } from 'models/Wallet/Wallet';
export const CREATE_WALLET = 'wallets/CREATE_WALLET';
export const REMOVE_WALLET = 'wallets/REMOVE_WALLET';
export const UPDATE_WALLET = 'wallets/UPDATE_WALLET';

export interface WalletConfig {
  name?: string,
  balance?: number,
}

interface CreateWalletAction {
  type: typeof CREATE_WALLET
  payload: Wallet
}

interface UpdateWalletAction {
  type: typeof UPDATE_WALLET,
  id: string,
  payload: WalletConfig
}

interface RemoveWalletAction {
  type: typeof REMOVE_WALLET,
  id: string
}

export type WalletActions = CreateWalletAction | UpdateWalletAction | RemoveWalletAction
