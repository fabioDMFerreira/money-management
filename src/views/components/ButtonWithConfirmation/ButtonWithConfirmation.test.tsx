import '@testing-library/jest-dom/extend-expect';

import { fireEvent, render, screen } from '@testing-library/react';
import * as React from 'react';

import ButtonWithConfirmation from './ButtonWithConfirmation';

jest.mock(
  'popper.js',
  () =>
    class Popper {
      static placements = [
        'auto',
        'auto-end',
        'auto-start',
        'bottom',
        'bottom-end',
        'bottom-start',
        'left',
        'left-end',
        'left-start',
        'right',
        'right-end',
        'right-start',
        'top',
        'top-end',
        'top-start',
      ];

      constructor() {
        return {
          destroy: jest.fn(),
          scheduleUpdate: jest.fn(),
        };
      }
    },
);

describe('components/ButtonWithConfirmation', () => {
  it('should show the confirmation message when the button is clicked', () => {
    const confirmationMessage = 'Are you sure you want to delete?';
    const onClick = jest.fn();
    render(<ButtonWithConfirmation onClick={onClick} confirmationMessage={confirmationMessage}>Delete</ButtonWithConfirmation>);

    expect(screen.queryByText(confirmationMessage)).toBeNull();

    fireEvent.click(screen.getByText(/Delete/i));

    expect(screen.getByText(confirmationMessage)).toBeInTheDocument();
  });

  it('should call onClick prop function if user clicks on popover confirmation button', () => {
    const onClick = jest.fn();

    render(<ButtonWithConfirmation onClick={onClick} >Delete</ButtonWithConfirmation>);

    expect(screen.queryByText('Are you sure?')).toBeNull();

    fireEvent.click(screen.getByText(/Delete/i));

    fireEvent.click(screen.getByText(/Yes/i));

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
