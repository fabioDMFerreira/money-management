import React from 'react';
import { connect } from 'react-redux';
import EditableRemovableListItem from 'views/components/EditableRemovableListItem';
import { Wallet } from 'models/Wallet';
import { updateWallet, removeWallet } from 'state/ducks/wallets';

interface Props {
  wallet: Wallet,
  update: (wallet: Wallet, value: string) => void,
  remove: (wallet: Wallet) => void,
}

const WalletItemContainer = (props: Props) => (
  <EditableRemovableListItem<Wallet>
    element={props.wallet}
    update={props.update}
    remove={props.remove}
    label={props.wallet.name}
    color={props.wallet.color}
  />
)

export default connect(null, dispatch => ({
  update: (wallet: Wallet, value: string) => dispatch(updateWallet(wallet.id, { name: value })),
  remove: (wallet: Wallet) => dispatch(removeWallet(wallet.id))
}))(WalletItemContainer);
