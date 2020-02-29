import { Wallet, WalletFactory } from 'models/Wallet';
import React from 'react';
import Select from 'react-select/lib/Creatable';

interface Props {
  wallets: Wallet[];
  onChange: (value: any) => void;
  walletSelected?: string;
  createWallet?: (wallet: Wallet) => void;
  classNamePrefix?: string;
}


export default ({
  walletSelected, wallets, createWallet, onChange, ...props
}: Props) => {
  const options = [
    { label: 'All', value: '' },
    { label: 'Unsassigned', value: 'unassigned' },
    ...wallets.map(wallet => ({ label: wallet.name, value: wallet.id })),
  ];

  const value =
    walletSelected === 'unassigned' ?
      { name: 'Unsassigned', id: 'unassigned' } :
      wallets.find(wallet => wallet.id === walletSelected);

  return (
    <Select
      {...props}
      value={value ? { value: value.id, label: value.name } : { label: 'All', value: '' }}
      options={options}
      placeholder="Select wallet"
      onChange={(value) => {
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
};
