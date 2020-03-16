import { render } from '@testing-library/react';
import React from 'react';

import Select from './Select';

describe('components/Select', () => {
  it('should render', () => {
    const onChange = jest.fn();
    render(<Select onChange={onChange} value="value" options={[]} />);
  });
});
