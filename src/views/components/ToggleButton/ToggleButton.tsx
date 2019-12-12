import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import Button from 'reactstrap/lib/Button';


type Props = {
  active: boolean;
  onClick: () => void;
  icon?: IconProp;
  text?: string;
}

export default (props: Props) => (
  <Button
    {
    ...(
      props.active ?
        {} :
        { outline: true }
    )
    }
    color="secondary"
    size="sm"
    onClick={props.onClick}
  >
    {
      `${props.text} `
    }
    {
      props.icon &&
      <FontAwesomeIcon icon={props.icon} />
    }
  </Button>
);
