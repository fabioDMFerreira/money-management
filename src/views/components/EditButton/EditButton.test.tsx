import { render } from '@testing-library/react';
import React from 'react';

import EditButton from './EditButton';

describe('components/EditButton', () => {
  it('should render', () => {
    render(<EditButton />);
  });
});
