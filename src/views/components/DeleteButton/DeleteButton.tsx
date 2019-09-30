import React from 'react';
import { ButtonProps } from "reactstrap/lib/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import ButtonWithConfirmation from '../ButtonWithConfirmation';

export default (props: ButtonProps) => (
  <ButtonWithConfirmation {...props} color="link" size="sm" >
    <FontAwesomeIcon icon={faTrash} />
  </ButtonWithConfirmation>
)
