import { render } from '@testing-library/react';
import React from 'react';

import Badge from './Badge';

describe('components/Badge', () => {
  it('should render and display label text', () => {
    const { queryByText } = render(<Badge label="Hello world!" />);

    expect(queryByText('Hello world!')).toBeTruthy();
  });
});
