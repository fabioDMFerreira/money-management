

import { faBars, faEye, faEyeSlash, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { transactionEditableFields } from 'models/Transaction/TransactionEditableFields';
import React, { Component } from 'react';
import Button from 'reactstrap/lib/Button';
import styled from 'styled-components';
import ButtonWithConfirmation from 'views/components/ButtonWithConfirmation';


const TableActionsContainer = styled.div`
.btn{
  padding: 5px;
  margin-right:15px;
}
`;

type Props = {
  id: string;
  visible: boolean;
  removeTransaction: (transactionId: string) => void;
  updateTransaction: (transactionId: string, value: any, keyName: transactionEditableFields) => void;
  dragDisabled: boolean;
};


export default ({
  id,
  visible,
  dragDisabled,
  removeTransaction,
  updateTransaction,
}: Props) =>
  (
    <TableActionsContainer>
      {
        removeTransaction &&
        <ButtonWithConfirmation
          color="link"
          type="button"
          onClick={() => removeTransaction(id)}
          confirmationMessage="Are you sure you want to remove this transaction?"
        >
          <FontAwesomeIcon icon={faTrash} />
        </ButtonWithConfirmation>
      }

      {
        updateTransaction &&
        (() => {
          if (visible) {
            return <Button color="link" onClick={() => updateTransaction(id, false, 'visible')}><FontAwesomeIcon icon={faEye} /></Button>;
          }

          return <Button color="link" onClick={() => updateTransaction(id, true, 'visible')}><FontAwesomeIcon icon={faEyeSlash} /></Button>;
        })()
      }

      {
        !dragDisabled &&
        <span title="Drag transaction">
          <FontAwesomeIcon icon={faBars} />
        </span>
      }

    </TableActionsContainer>
  );
