import { render } from '@testing-library/react';
import React from 'react';

import ToggleButton from './ToggleButton';

describe('components/ToggleButton', () => {
  it('should render', () => {
    const onClick = jest.fn();
    render(<ToggleButton active onClick={onClick} />);
  });
});
