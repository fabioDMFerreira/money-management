import React, { Fragment, Component } from 'react';
import Button from 'reactstrap/lib/Button';
import Popover from 'reactstrap/lib/Popover';
import PopoverHeader from 'reactstrap/lib/PopoverHeader';
import PopoverBody from 'reactstrap/lib/PopoverBody';
import getRandomString from 'utils/getRandomString';

type Props = {
  onClick: () => any
  [key: string]: any
}

type State = {
  id: string,
  popoverOpen: boolean
}

export default class ButtonWithConfirmation extends Component<Props, State> {

  state: State = {
    id: getRandomString(5),
    popoverOpen: false,
  }

  openPopover = () => this.setState({ popoverOpen: true })

  closePopover = () => this.setState({ popoverOpen: false })

  confirm = () => {
    this.closePopover();
    this.props.onClick();
  }

  render() {
    const { children, ...props } = this.props;

    return (
      <Fragment>
        <Button id={`Confirm-${this.state.id}`} {...props} onClick={this.openPopover}>
          {children}
        </Button>
        <Popover placement="bottom" isOpen={this.state.popoverOpen} target={`Confirm-${this.state.id}`}>
          <PopoverHeader>Are you sure?</PopoverHeader>
          <PopoverBody><Button outline onClick={this.confirm}>Yes</Button> <Button onClick={this.closePopover} color="secondary">No</Button></PopoverBody>
        </Popover>
      </Fragment>
    );
  }
}
