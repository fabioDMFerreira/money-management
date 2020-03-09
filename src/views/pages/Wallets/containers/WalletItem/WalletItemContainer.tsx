import { Wallet } from 'models/Wallet';
import React from 'react';
import { connect } from 'react-redux';
import { removeWallet, updateWallet } from 'state/ducks/wallets';
import EditableRemovableListItem from 'views/components/EditableRemovableListItem';

interface Props {
  wallet: Wallet;
  update: (wallet: Wallet, value: string) => void;
  remove: (wallet: Wallet) => void;
}

const WalletItemContainer = (props: Props) => (
  <EditableRemovableListItem<Wallet>
    element={props.wallet}
    update={props.update}
    remove={props.remove}
    label={props.wallet.name}
    color={props.wallet.color}
    link={`/wallets/${props.wallet.id}`}
  />
);

export default connect(null, dispatch => ({
  update: (wallet: Wallet, value: string) => dispatch(updateWallet(wallet.id, { name: value })),
  remove: (wallet: Wallet) => dispatch(removeWallet(wallet.id)),
}))(WalletItemContainer);
