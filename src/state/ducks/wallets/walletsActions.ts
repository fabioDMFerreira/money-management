import { Wallet } from 'models/Wallet/Wallet';

import {
  CLEAR_WALLETS,
  CREATE_WALLET,
  REMOVE_WALLET,
  UPDATE_WALLET,
  WalletActions,
  WalletConfig,
} from './walletsTypes';

export const createWallet = (payload: Wallet): WalletActions => ({
  type: CREATE_WALLET,
  payload,
});

export const updateWallet = (id: string, payload: WalletConfig): WalletActions => ({
  type: UPDATE_WALLET,
  id,
  payload,
});

export const removeWallet = (id: string): WalletActions => ({
  type: REMOVE_WALLET,
  id,
});

export const clearWallets = (): WalletActions => ({
  type: CLEAR_WALLETS,
});
