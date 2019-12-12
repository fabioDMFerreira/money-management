
import { List } from 'immutable';
import { Wallet, WalletFactory } from 'models/Wallet';
import getRandomDarkColor from 'utils/getRandomDarkColor';

import { createWallet, removeWallet, updateWallet } from './actions';
import reducer, { initialState, WalletsState } from './reducer';
import { WalletConfig } from './types';


describe('Wallet reducer', () => {
  it('should create a wallet', () => {
    const wallet = WalletFactory.build('Paypal', 1000);

    const actual = reducer(initialState, createWallet(wallet));
    const expected: WalletsState = {
      wallets: List<Wallet>([wallet]),
    };

    expect(actual).toEqual(expected);
  });

  it('should update a wallet', () => {
    const wallet1 = WalletFactory.build('Paypal', 1000, getRandomDarkColor());
    const wallet2 = WalletFactory.build('Stripe', 5000, getRandomDarkColor());
    const initialState = {
      wallets: List<Wallet>([wallet1, wallet2]),
    };

    const actual = reducer(initialState, updateWallet(wallet1.id, { name: 'Bank', balance: 2000 }));
    const expected: WalletsState = {
      wallets: List<Wallet>([{
        id: wallet1.id, name: 'Bank', balance: 2000, color: wallet1.color,
      }, wallet2]),
    };

    expect(actual).toEqual(expected);
  });

  it('should remove a wallet', () => {
    const wallet1 = WalletFactory.build('Paypal', 1000);
    const wallet2 = WalletFactory.build('Stripe', 5000);
    const initialState = {
      wallets: List<Wallet>([wallet1, wallet2]),
    };

    const actual = reducer(initialState, removeWallet(wallet1.id));
    const expected: WalletsState = {
      wallets: List<Wallet>([wallet2]),
    };

    expect(actual).toEqual(expected);
  });
});
