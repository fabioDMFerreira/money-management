import { WalletFactory } from 'models/Wallet';
import getRandomDarkColor from 'utils/getRandomDarkColor';

import { clearWallets, createWallet, removeWallet, updateWallet } from './walletsActions';
import reducer, { initialState, WalletsState } from './walletsReducer';


describe('Wallets reducer', () => {
  it('should create a wallet', () => {
    const wallet = WalletFactory.build('Paypal', 1000);

    const actual = reducer(initialState, createWallet(wallet));
    const expected: WalletsState = {
      wallets: [wallet],
    };

    expect(actual).toEqual(expected);
  });

  it('should update a wallet', () => {
    const wallet1 = WalletFactory.build('Paypal', 1000, getRandomDarkColor());
    const wallet2 = WalletFactory.build('Stripe', 5000, getRandomDarkColor());
    const initialState = {
      wallets: [wallet1, wallet2],
    };

    const actual = reducer(initialState, updateWallet(wallet1.id, { name: 'Bank', balance: 2000 }));
    const expected: WalletsState = {
      wallets: [
        {
          id: wallet1.id, name: 'Bank', balance: 2000, color: wallet1.color,
        }, wallet2,
      ],
    };

    expect(actual).toEqual(expected);
  });

  it('should remove a wallet', () => {
    const wallet1 = WalletFactory.build('Paypal', 1000);
    const wallet2 = WalletFactory.build('Stripe', 5000);
    const initialState = {
      wallets: [wallet1, wallet2],
    };

    const actual = reducer(initialState, removeWallet(wallet1.id));
    const expected: WalletsState = {
      wallets: [wallet2],
    };

    expect(actual).toEqual(expected);
  });

  it('should remove all the wallets', () => {
    const wallet1 = WalletFactory.build('Paypal', 1000);
    const wallet2 = WalletFactory.build('Stripe', 5000);
    const initialState = {
      wallets: [wallet1, wallet2],
    };

    const actual = reducer(initialState, clearWallets());
    const expected: WalletsState = {
      wallets: [],
    };

    expect(actual).toEqual(expected);
  });
});
