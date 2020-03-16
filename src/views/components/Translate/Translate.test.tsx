import { render } from '@testing-library/react';
import React from 'react';

import Translate from './Translate';

describe('components/Translate', () => {
  it('should render', () => {
    render(<Translate id="test" />);
  });
});
