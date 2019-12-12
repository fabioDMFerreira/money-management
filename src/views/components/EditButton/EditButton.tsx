import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import Button, { ButtonProps } from 'reactstrap/lib/Button';


export default (props: ButtonProps) => (
  <Button {...props} color="link" size="sm" >
    <FontAwesomeIcon icon={faEdit} />
  </Button>
);
