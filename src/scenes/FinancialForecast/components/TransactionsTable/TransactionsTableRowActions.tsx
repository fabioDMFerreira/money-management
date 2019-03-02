import React, { Component } from 'react';
import Button from 'reactstrap/lib/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEye, faEyeSlash, faBars } from '@fortawesome/free-solid-svg-icons';
import transactionEditableFields from 'scenes/FinancialForecast/transactionEditableFields';
import Popover from 'reactstrap/lib/Popover';
import PopoverHeader from 'reactstrap/lib/PopoverHeader';
import PopoverBody from 'reactstrap/lib/PopoverBody';
import styled from 'styled-components';

const PopoverButtonsContainer = styled.div`
  .btn{
    margin-right:10px;
  }
`;

const TableActionsContainer = styled.div`
.btn{
  margin-right:10px;
}
`;

type Props = {
  id: string,
  visible: boolean,
  removeTransaction: (transactionId: string) => void,
  updateTransaction: (transactionId: string, value: any, keyName: transactionEditableFields) => void
};

type State = {
  removePopoverOpen: boolean
}

export default class TransactionsTableRowActions extends Component<Props, State>{

  state = {
    removePopoverOpen: false
  }

  toggleRemovePopover = () => {
    this.setState({
      removePopoverOpen: !this.state.removePopoverOpen
    })
  }

  removeTransaction = () => {
    this.setState({
      removePopoverOpen: false,
    }, () => {
      this.props.removeTransaction(this.props.id);
    })
  }

  render() {
    const {
      id,
      visible,
      updateTransaction,
    } = this.props;

    const { removePopoverOpen } = this.state;

    return <TableActionsContainer>
      <Button id={`RemoveTransactionPopover${id}`} color="link" type="button" onClick={this.toggleRemovePopover}>
        <FontAwesomeIcon icon={faTrash} />
      </Button>
      <Popover placement="top" isOpen={removePopoverOpen} target={`RemoveTransactionPopover${id}`} toggle={this.toggleRemovePopover}>
        <PopoverHeader>Are you sure you want to remove this transaction?</PopoverHeader>
        <PopoverBody>
          <PopoverButtonsContainer>
            <Button color="primary" onClick={this.removeTransaction}>
              Yes
          </Button>
            <Button color="secondary" onClick={this.toggleRemovePopover}>
              No
          </Button>
          </PopoverButtonsContainer>
        </PopoverBody>
      </Popover>

      {
        (() => {
          if (visible) {
            return <Button color="link" onClick={() => updateTransaction(id, false, "visible")}><FontAwesomeIcon icon={faEye} /></Button>
          }

          return <Button color="link" onClick={() => updateTransaction(id, true, "visible")}><FontAwesomeIcon icon={faEyeSlash} /></Button>
        })()
      }

      <FontAwesomeIcon icon={faBars} />

    </TableActionsContainer>
  }
};
