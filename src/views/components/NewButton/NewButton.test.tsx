import { render } from '@testing-library/react';
import React from 'react';

import NewButton from './NewButton';

describe('components/NewButton', () => {
  it('should render', () => {
    render(<NewButton />);
  });
});
