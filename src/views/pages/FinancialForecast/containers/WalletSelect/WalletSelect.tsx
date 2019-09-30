import React, { Component } from 'react';
import { Wallet, WalletFactory } from 'models/Wallet';
import Select from 'react-select/lib/Creatable';
import { createWallet } from 'state/ducks/wallets';

interface Props {
  wallets: Wallet[],
  walletSelected: string
  onChange: (value: any) => void
  createWallet: typeof createWallet
  classNamePrefix?: string
}


export default class WalletSelect extends Component<Props>{

  render() {
    const { walletSelected, wallets, createWallet, onChange, ...props } = this.props;

    const options = [
      { label: 'All', value: '' },
      { label: 'Unsassigned', value: 'null' },
      ...wallets.map(wallet => ({ label: wallet.name, value: wallet.id }))
    ];

    const value = wallets.find(wallet => wallet.id === walletSelected)

    return (
      <Select
        {...props}
        value={value ? { value: value.id, label: value.name } : { label: 'Unassigned', value: 'null' }}
        options={options}
        placeholder={"Select wallet"}
        onChange={value => {
          onChange(value);
        }}
        onCreateOption={(newOptionLabel: any) => {
          const wallet = WalletFactory.build(newOptionLabel.label, 0);
          createWallet(wallet);
          onChange(wallet);
        }}
      />
    );
  }
};
