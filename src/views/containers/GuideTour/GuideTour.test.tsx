import { render } from '@testing-library/react';
import React from 'react';

import GuideTour from './GuideTour';

describe('containers/GuideTour', () => {
  it('should render component', () => {
    const translate = jest.fn();
    const onClose = jest.fn();
    render(<GuideTour translate={translate} onClose={onClose} started={false} steps={[]} />);
  });
});
