import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import Button from 'reactstrap/lib/Button';

interface Props {
  to: string,
}

export default ({ to }: Props) => (
  <Link to={to}>
    <Button color="link" size="sm">
      <FontAwesomeIcon icon={faLink} />
    </Button>
  </Link>
)
