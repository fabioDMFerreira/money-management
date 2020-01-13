

import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { ButtonProps } from 'reactstrap/lib/Button';

import ButtonWithConfirmation from '../ButtonWithConfirmation';


export default (props: ButtonProps & { onClick: (e: React.MouseEvent<HTMLButtonElement>) => void }) => (
  <ButtonWithConfirmation {...props} color="link" size="sm" >
    <FontAwesomeIcon icon={faTrash} />
  </ButtonWithConfirmation>
);
