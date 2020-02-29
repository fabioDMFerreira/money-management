import { NO, YES } from 'locale/consts';
import React, { Component, Fragment } from 'react';
import Button, { ButtonProps } from 'reactstrap/lib/Button';
import Popover from 'reactstrap/lib/Popover';
import PopoverBody from 'reactstrap/lib/PopoverBody';
import PopoverHeader from 'reactstrap/lib/PopoverHeader';
import getRandomString from 'utils/getRandomString';

import Translate from '../Translate';

type Props = {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  confirmationMessage?: any;
} & ButtonProps;

type State = {
  id: string;
  popoverOpen: boolean;
}

// export default (props: Props) => {
//   const [popoverOpen, setPopoverOpen] = useState(false);
//   const id = `Confirm-${getRandomString()}`;

//   const confirm = (e: React.MouseEvent<HTMLButtonElement>) => {
//     setPopoverOpen(false);
//     if (props.onClick) {
//       props.onClick(e);
//     }
//   };

//   return (
//     <Fragment >
//       <Button {...props} id={id} onClick={() => setPopoverOpen(true)}>
//         {props.children}
//       </Button>
//       <Popover placement="bottom" isOpen={popoverOpen} target={id}>
//         <PopoverHeader>{props.confirmationMessage || 'Are you sure?'}</PopoverHeader>
//         <PopoverBody>
//           <Button color="primary" onClick={confirm}><Translate id={YES} /></Button>
//           {' '}
//           <Button onClick={() => setPopoverOpen(false)} color="secondary"><Translate id={NO} /></Button>
//         </PopoverBody>
//       </Popover>
//     </Fragment>
//   );
// };

export default class ButtonWithConfirmation extends Component<Props, State> {
  state: State = {
    id: getRandomString(),
    popoverOpen: false,
  }

  openPopover = () => this.setState({ popoverOpen: true })

  closePopover = () => this.setState({ popoverOpen: false })

  confirm = (e: React.MouseEvent<HTMLButtonElement>): void => {
    this.closePopover();
    this.props.onClick(e);
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
