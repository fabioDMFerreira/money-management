import React, { Component } from 'react';
import { Wallet, WalletFactory } from 'models/Wallet';
import Select from 'react-select/lib/Creatable';

interface Props {
  wallets: Wallet[],
  onChange: (value: any) => void
  walletSelected?: string
  createWallet?: (wallet: Wallet) => void
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
          const wallet = WalletFactory.build(newOptionLabel, 0);
          if (createWallet) {
            createWallet(wallet);
          }
          onChange(wallet);
        }}
      />
    );
  }
};
