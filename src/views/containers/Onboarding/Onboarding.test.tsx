import { render } from '@testing-library/react';
import React from 'react';

import Onboarding from './Onboarding';

describe('components/Onboarding', () => {
  it('should render', () => {
    render(<Onboarding />);
  });
});
