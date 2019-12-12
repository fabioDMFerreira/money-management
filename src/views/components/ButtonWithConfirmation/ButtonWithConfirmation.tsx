import { NO, YES } from 'locale/consts';
import React, { Component, Fragment, MouseEvent } from 'react';
import Button, { ButtonProps } from 'reactstrap/lib/Button';
import Popover from 'reactstrap/lib/Popover';
import PopoverBody from 'reactstrap/lib/PopoverBody';
import PopoverHeader from 'reactstrap/lib/PopoverHeader';
import getRandomString from 'utils/getRandomString';

import Translate from '../Translate';

type Props = {
  confirmationMessage?: any;
  [key: string]: any;
} & ButtonProps;

type State = {
  id: string;
  popoverOpen: boolean;
}

export default class ButtonWithConfirmation extends Component<Props, State> {
  state: State = {
    id: getRandomString(5),
    popoverOpen: false,
  }

  openPopover = () => this.setState({ popoverOpen: true })

  closePopover = () => this.setState({ popoverOpen: false })

  confirm = (e: React.MouseEvent<HTMLButtonElement>): void => {
    this.closePopover();
    if (this.props.onClick) {
      this.props.onClick(e);
    }
  }

  render() {
    const { children, confirmationMessage, ...props } = this.props;

    return (
      <Fragment>
        <Button id={`Confirm-${this.state.id}`} {...props} onClick={this.openPopover}>
          {children}
        </Button>
        <Popover placement="bottom" isOpen={this.state.popoverOpen} target={`Confirm-${this.state.id}`}>
          <PopoverHeader>{confirmationMessage || 'Are you sure?'}</PopoverHeader>
          <PopoverBody>
            <Button color="primary" onClick={this.confirm}><Translate id={YES} /></Button>
            {' '}
            <Button onClick={this.closePopover} color="secondary"><Translate id={NO} /></Button>
          </PopoverBody>
        </Popover>
      </Fragment>
    );
  }
}
