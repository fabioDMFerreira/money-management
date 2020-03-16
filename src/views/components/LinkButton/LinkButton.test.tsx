import { render } from '@testing-library/react';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import LinkButton from './LinkButton';

describe('components/LinkButton', () => {
  it('should render', () => {
    render((
      <Router>
        <LinkButton to="/mmanagement" />
      </Router>
    ));
  });
});
