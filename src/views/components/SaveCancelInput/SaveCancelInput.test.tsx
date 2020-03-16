import { render } from '@testing-library/react';
import React from 'react';

import SaveCancelInput from './SaveCancelInput';

describe('components/SaveCancelInput', () => {
  it('should render', () => {
    const save = jest.fn();
    const cancel = jest.fn();
    render(<SaveCancelInput initialValue="initial" save={save} cancel={cancel} />);
  });
});
