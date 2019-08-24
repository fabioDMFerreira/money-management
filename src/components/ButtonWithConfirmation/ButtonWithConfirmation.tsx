import React, { Fragment, Component } from 'react';
import Button from 'reactstrap/lib/Button';
import Popover from 'reactstrap/lib/Popover';
import PopoverHeader from 'reactstrap/lib/PopoverHeader';
import PopoverBody from 'reactstrap/lib/PopoverBody';

type Props = {
  onClick: () => any
  [key: string]: any
}

type State = {
  popoverOpen: boolean
}

export default class ButtonWithConfirmation extends Component<Props, State> {

  state: State = {
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
        <Button id="ConfirmPopover" {...props} onClick={this.openPopover}>
          {children}
        </Button>
        <Popover placement="bottom" isOpen={this.state.popoverOpen} target="ConfirmPopover">
          <PopoverHeader>Are you sure?</PopoverHeader>
          <PopoverBody><Button outline onClick={this.confirm}>Yes</Button> <Button onClick={this.closePopover}  color="secondary">No</Button></PopoverBody>
        </Popover>
      </Fragment>
    );
  }
}
