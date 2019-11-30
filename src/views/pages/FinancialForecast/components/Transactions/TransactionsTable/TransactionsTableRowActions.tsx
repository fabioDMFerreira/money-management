import React, { Component } from 'react';
import Button from 'reactstrap/lib/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEye, faEyeSlash, faBars } from '@fortawesome/free-solid-svg-icons';
import transactionEditableFields from 'models/Transaction/TransactionEditableFields';
import styled from 'styled-components';
import ButtonWithConfirmation from 'views/components/ButtonWithConfirmation';

const TableActionsContainer = styled.div`
.btn{
  padding: 5px;
  margin-right:15px;
}
`;

type Props = {
  id: string,
  visible: boolean,
  removeTransaction: (transactionId: string) => void,
  updateTransaction: (transactionId: string, value: any, keyName: transactionEditableFields) => void
  dragDisabled: boolean
};

type State = {
  removePopoverOpen: boolean
}

export default class TransactionsTableRowActions extends Component<Props, State>{

  state = {
    removePopoverOpen: false
  }

  render() {
    const {
      id,
      visible,
      updateTransaction,
      dragDisabled
    } = this.props;

    return <TableActionsContainer>
      {
        this.props.removeTransaction &&
        <ButtonWithConfirmation color="link" type="button" onClick={() => this.props.removeTransaction(this.props.id)} confirmationMessage="Are you sure you want to remove this transaction?">
          <FontAwesomeIcon icon={faTrash} />
        </ButtonWithConfirmation>
      }

      {
        this.props.updateTransaction &&
        (() => {
          if (visible) {
            return <Button color="link" onClick={() => updateTransaction(id, false, "visible")}><FontAwesomeIcon icon={faEye} /></Button>
          }

          return <Button color="link" onClick={() => updateTransaction(id, true, "visible")}><FontAwesomeIcon icon={faEyeSlash} /></Button>
        })()
      }

      {
        !dragDisabled &&
        <span title="Drag transaction">
          <FontAwesomeIcon icon={faBars} />
        </span>
      }

    </TableActionsContainer>
  }
};
