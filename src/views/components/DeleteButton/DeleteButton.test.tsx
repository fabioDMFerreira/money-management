import { render } from '@testing-library/react';
import React from 'react';

import DeleteButton from './DeleteButton';

describe('components/DeleteButton', () => {
  it('should render', () => {
    const onClick = jest.fn();

    render(<DeleteButton onClick={onClick} />);
  });
});
